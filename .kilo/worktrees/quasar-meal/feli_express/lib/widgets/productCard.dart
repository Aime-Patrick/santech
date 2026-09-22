import 'package:another_flushbar/flushbar.dart';
import 'package:feli_express/models/cart.model.dart';
import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/pages/related_product_page.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/services/state-management/wishlist.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/productdialogue.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

Widget productCard(BuildContext context, Product product) {
  var cartData = context.watch<CartProvider>();
  bool isInCart = cartData.cartItems.any((element) => element.id == product.id);
  var screenSize = MediaQuery.of(context).size;
  bool hascolor = product.hasColors;
  bool hasSize = product.hasMeasurements;

  String selectedCategory = '';
  String selectedProductID = product.id!;
  double imageWidth = MediaQuery.of(context).orientation == Orientation.portrait
      ? screenSize.width
      : screenSize.width;
  List<CartItem> allItems = cartData.cartItems;
  int index = allItems.indexWhere((element) => element.id == product.id);

  print('Product card: $isInCart');
  return Container(
    width: MediaQuery.of(context).size.width > 800
        ? MediaQuery.of(context).size.width / 4 - 16
        : MediaQuery.of(context).size.width > 600
            ? MediaQuery.of(context).size.width / 3 - 16
            : MediaQuery.of(context).size.width / 2 - 16,
    margin: EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 5.0),
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(5),
      border: Border.all(
        color: AppColors.primaryColor,
        width: 0.5,
      ),
    ),
    child: Stack(
      children: [
        Column(
          children: [
            Container(
              margin: EdgeInsets.all(8.0),
              height: 160,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(5),
                  topRight: Radius.circular(5),
                ),
                image: DecorationImage(
                  image: NetworkImage(
                    product.productImages!.productThumbnail.url.toString(),
                  ),
                  fit: BoxFit.fill,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 8.0, right: 8.0),
              child: Container(
                width: double.maxFinite,

                // width: 150,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      // '${product.name!.length > 30 ? product.name!.substring(0, 30) + '...' : product.name}',
                      '${product.name}',
                      style: const TextStyle(
                          color: AppColors.primarytextColor,
                          fontSize: 15,
                          fontWeight: FontWeight.w500),
                    ),
                    if (product.discountPercentage > 0)
                      Text(
                        'Price: ${product.price.toStringAsFixed(2)} RWF',
                        style: TextStyle(
                          color: product.discountPercentage > 0
                              ? AppColors.errorcolor
                              : AppColors.primaryColor,
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          decoration: product.discountPercentage > 0
                              ? TextDecoration.lineThrough
                              : TextDecoration.none,
                        ),
                      ),
                    Text(
                      'Price: ${(product.price - ((product.discountPercentage / 100) * product.price)).toStringAsFixed(2)} RWF',
                      style: const TextStyle(
                        color: AppColors.primaryColor,
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            )
          ],
        ),

        //  final RenderBox box = context.findRenderObject() as RenderBox;
        //         final Offset position = box.localToGlobal(Offset.zero);
        if (isInCart)
          Positioned(
            top: 0.0,
            left: -5.0,
            child: Container(
              // height: 150,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      child: SizedBox(
                        // height: 20,
                        child: CircleAvatar(
                          radius: 15,
                          backgroundColor: Colors.black12,
                          child: IconButton(
                            icon: Icon(
                              Icons.add,
                              size: 15,
                              color: isInCart
                                  ? AppColors.primaryColor
                                  : AppColors.errorcolor,
                            ),
                            onPressed: () {
                              try {
                                bool isIncreased = context
                                    .read<CartProvider>()
                                    .increaseQuantityByCart(allItems[index]);
                                if (!isIncreased) {
                                  Flushbar(
                                    message:
                                        'No more stock available for this product',
                                    padding: const EdgeInsets.all(10),
                                    maxWidth: 200,
                                    flushbarPosition: FlushbarPosition.TOP,
                                    backgroundColor: AppColors.primaryColor,
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(10)),
                                    duration: const Duration(seconds: 3),
                                  ).show(context);
                                }
                              } catch (e) {
                                print('Error increasing quantity: $e');
                              }
                            },
                          ),
                        ),
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.only(top: 5.0, bottom: 5.0),
                      width: 25.0,
                      height: 25.0,
                      child: SizedBox(
                        child: allItems.isNotEmpty &&
                                index >= 0 &&
                                index < allItems.length
                            ? CircleAvatar(
                                backgroundColor: AppColors.primaryColor,
                                child: Text(
                                  '${context.read<CartProvider>().totalSimilarItems(allItems[index].id as String)}',
                                  style: const TextStyle(
                                      color: AppColors.AppColor,
                                      fontSize: 10,
                                      fontWeight: FontWeight.bold),
                                ),
                              )
                            : Container(),
                      ),
                    ),
                    Container(
                      child: SizedBox(
                        child: CircleAvatar(
                          radius: 15,
                          backgroundColor: Colors.black12,
                          child: IconButton(
                            icon: Icon(
                              Icons.remove,
                              size: 15,
                              color: isInCart
                                  ? AppColors.errorcolor
                                  : AppColors.errorcolor,
                            ),
                            onPressed: () {
                              try {
                                context
                                    .read<CartProvider>()
                                    .decreaseQuantityByCart(allItems[index]);
                              } catch (e) {
                                print('Error decreasing quantity: $e');
                              }
                            },
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        if (!isInCart)
          Positioned(
              // bottom: 2.0,
              top: 0.0,
              left: -3.0,
              child: Container(
                padding: EdgeInsets.only(right: 0.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if ((hasSize || hascolor) && !isInCart) ...[
                      Container(
                          margin: const EdgeInsets.only(top: 5.0, left: 5.0),
                          child: CircleAvatar(
                            backgroundColor: Colors.black12,
                            child: IconButton(
                              onPressed: () {
                                MyProductDialogue(context, product);
                                Flushbar(
                                  message:
                                      'Please select a size & color for this product ',
                                  duration: const Duration(seconds: 5),
                                  flushbarPosition: FlushbarPosition.TOP,
                                  margin: const EdgeInsets.all(8),
                                  padding: const EdgeInsets.all(10),
                                  maxWidth: 200,
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(8)),
                                  backgroundColor: AppColors.primaryColor,
                                ).show(context);
                              },
                              icon: const Icon(Icons.shopping_cart),
                            ),
                          ))
                    ] else if (!isInCart && (!hasSize && !hascolor)) ...[
                      Container(
                        margin: const EdgeInsets.only(top: 5.0, left: 5.0),
                        child: CircleAvatar(
                          backgroundColor: Colors.black12,
                          child: IconButton(
                            onPressed: () {
                              context
                                  .read<CartProvider>()
                                  .addToCart(product, '', '', null);
                            },
                            icon: const Icon(Icons.shopping_cart),
                          ),
                        ),
                      ),
                    ]
                  ],
                ),
              )),
        Positioned(
          right: -5.0,
          top: 0,
          child: Builder(builder: (context) {
            return IconButton(
              onPressed: () {
                final RenderBox box = context.findRenderObject() as RenderBox;
                final Offset position = box.localToGlobal(Offset.zero);
                showMenu(
                    context: context,
                    position: RelativeRect.fromLTRB(
                        position.dx,
                        position.dy,
                        screenSize.width - position.dx,
                        screenSize.height - position.dy),
                    items: [
                      PopupMenuItem(
                        child: ListTile(
                          title: Text('Add to wishlist'),
                          onTap: () {
                            // Add to wishlist
                            var wishlistProvider =
                                context.read<WishlistProvider>();
                            if (wishlistProvider.wishlist.contains(product)) {
                              wishlistProvider.removeProduct(product);
                              Flushbar(
                                message: 'Product removed from wishlist',
                                duration: const Duration(seconds: 3),
                                flushbarPosition: FlushbarPosition.TOP,
                                margin: const EdgeInsets.all(8),
                                padding: const EdgeInsets.all(10),
                                maxWidth: 200,
                                borderRadius:
                                    BorderRadius.all(Radius.circular(8)),
                                backgroundColor: AppColors.primaryColor,
                              ).show(context);
                            } else {
                              wishlistProvider.addProduct(product);
                              Flushbar(
                                message: 'Product added to wishlist',
                                duration: const Duration(seconds: 3),
                                flushbarPosition: FlushbarPosition.TOP,
                                margin: const EdgeInsets.all(8),
                                padding: const EdgeInsets.all(10),
                                maxWidth: 200,
                                borderRadius:
                                    BorderRadius.all(Radius.circular(8)),
                                backgroundColor: AppColors.primaryColor,
                              ).show(context);
                            }
                          },
                        ),
                      ),
                      PopupMenuItem(
                        child: ListTile(
                          title: Text('Related products'),
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => RelatedProductsScreen(
                                      selectedProductID: selectedProductID)),
                            );
                          },
                        ),
                      )
                    ]);
              },
              icon: const Icon(
                Icons.more_vert_outlined,
                color: AppColors.primaryColor,
              ),
            );
          }),
        ),
        Positioned(
            bottom: 2.0,
            right: 2.0,
            child: product.discountPercentage > 0
                ? Container(
                    padding: const EdgeInsets.all(5),
                    decoration: BoxDecoration(
                      color: AppColors.errorcolor,
                      borderRadius: BorderRadius.circular(5),
                    ),
                    child: Text(
                      '${product.discountPercentage}% off',
                      style: const TextStyle(
                        color: AppColors.AppColor,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  )
                : Container())
      ],
    ),
  );
}









// Widget productCard(BuildContext context, Product product) {
//   var cartData = context.watch<CartProvider>();
//   bool isInCart = cartData.cartItems.any((element) => element.id == product.id);
//   var screenSize = MediaQuery.of(context).size;
//   bool hascolor = product.hasColors;
//   bool hasSize = product.hasMeasurements;

//   String selectedCategory = '';
//   String selectedProductID = product.id!;
//   double imageWidth = MediaQuery.of(context).orientation == Orientation.portrait
//       ? screenSize.width
//       : screenSize.width;
//   List<CartItem> allItems = cartData.cartItems;
//   int index = allItems.indexWhere((element) => element.id == product.id);

//   print('Product card: $isInCart');
//   return Container(
//     height: 320,
//     width: 320,
//     margin: EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 10.0),
//     decoration: BoxDecoration(
//       borderRadius: BorderRadius.circular(5),
//       border: Border.all(
//         color: AppColors.primaryColor,
//         width: 0.5,
//       ),
//     ),
//     child: Stack(
//       children: [
//         Column(
//           children: [
//             Container(
//               margin: EdgeInsets.all(8.0),
//               height: 160,
//               decoration: BoxDecoration(
//                 borderRadius: BorderRadius.only(
//                   topLeft: Radius.circular(5),
//                   topRight: Radius.circular(5),
//                 ),
//                 image: DecorationImage(
//                   image: NetworkImage(
//                     product.productImages!.productThumbnail.url.toString(),
//                   ),
//                   fit: BoxFit.fill,
//                 ),
//               ),
//             ),
//             Padding(
//               padding: const EdgeInsets.only(left: 5.0, right: 5.0),
//               child: Row(
//                 children: [
//                   Flexible(
//                     child: Container(
//                       color: AppColors.primaryColor,
//                       child: Column(
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           Text(
//                             '${product.name!.length > 30 ? product.name!.substring(0, 30) + '...' : product.name}',
//                             style: const TextStyle(
//                                 color: AppColors.primarytextColor,
//                                 fontSize: 15,
//                                 fontWeight: FontWeight.w500),
//                             overflow: TextOverflow.ellipsis,
//                           ),
//                           if (product.discountPercentage > 0)
//                             Text(
//                               'Price: ${product.price.toStringAsFixed(2)} RWF',
//                               style: TextStyle(
//                                 color: product.discountPercentage > 0
//                                     ? AppColors.errorcolor
//                                     : AppColors.primaryColor,
//                                 fontSize: 13,
//                                 fontWeight: FontWeight.bold,
//                                 decoration: product.discountPercentage > 0
//                                     ? TextDecoration.lineThrough
//                                     : TextDecoration.none,
//                               ),
//                               overflow: TextOverflow.ellipsis,
//                             ),
//                           Text(
//                             'Price: ${(product.price - ((product.discountPercentage / 100) * product.price)).toStringAsFixed(2)} RWF',
//                             style: const TextStyle(
//                               color: AppColors.primaryColor,
//                               fontSize: 13,
//                               fontWeight: FontWeight.bold,
//                             ),
//                             overflow: TextOverflow.ellipsis,
//                           ),
//                         ],
//                       ),
//                     ),
//                   ),
//                   IconButton(
//                     padding: EdgeInsets.only(right: 0.0),
//                     onPressed: () {
//                       if ((hasSize || hascolor) && !isInCart) {
//                         MyProductDialogue(context, product);
//                         Flushbar(
//                           message: 'Please select a size & color for this product',
//                           duration: const Duration(seconds: 5),
//                           flushbarPosition: FlushbarPosition.TOP,
//                           margin: const EdgeInsets.all(8),
//                           padding: const EdgeInsets.all(10),
//                           maxWidth: 200,
//                           borderRadius: BorderRadius.all(Radius.circular(8)),
//                           backgroundColor: AppColors.primaryColor,
//                         ).show(context);
//                       } else if (!isInCart && (!hasSize && !hascolor)) {
//                         context.read<CartProvider>().addToCart(product, '', '', null);
//                       }
//                     },
//                     icon: const Icon(Icons.shopping_cart),
//                   ),
//                 ],
//               ),
//             ),
//           ],
//         ),
//         Positioned(
//           right: 0,
//           top: 0,
//           child: Builder(builder: (context) {
//             return IconButton(
//               onPressed: () {
//                 final RenderBox box = context.findRenderObject() as RenderBox;
//                 final Offset position = box.localToGlobal(Offset.zero);
//                 showMenu(
//                     context: context,
//                     position: RelativeRect.fromLTRB(
//                         position.dx,
//                         position.dy,
//                         screenSize.width - position.dx,
//                         screenSize.height - position.dy),
//                     items: [
//                       PopupMenuItem(
//                         child: ListTile(
//                           title: Text('Add to wishlist'),
//                           onTap: () {
//                             var wishlistProvider =
//                                 context.read<WishlistProvider>();
//                             if (wishlistProvider.wishlist.contains(product)) {
//                               wishlistProvider.removeProduct(product);
//                               Flushbar(
//                                 message: 'Product removed from wishlist',
//                                 duration: const Duration(seconds: 3),
//                                 flushbarPosition: FlushbarPosition.TOP,
//                                 margin: const EdgeInsets.all(8),
//                                 padding: const EdgeInsets.all(10),
//                                 maxWidth: 200,
//                                 borderRadius:
//                                     BorderRadius.all(Radius.circular(8)),
//                                 backgroundColor: AppColors.primaryColor,
//                               ).show(context);
//                             } else {
//                               wishlistProvider.addProduct(product);
//                               Flushbar(
//                                 message: 'Product added to wishlist',
//                                 duration: const Duration(seconds: 3),
//                                 flushbarPosition: FlushbarPosition.TOP,
//                                 margin: const EdgeInsets.all(8),
//                                 padding: const EdgeInsets.all(10),
//                                 maxWidth: 200,
//                                 borderRadius:
//                                     BorderRadius.all(Radius.circular(8)),
//                                 backgroundColor: AppColors.primaryColor,
//                               ).show(context);
//                             }
//                           },
//                         ),
//                       ),
//                       PopupMenuItem(
//                         child: ListTile(
//                           title: Text('Related products'),
//                           onTap: () {
//                             Navigator.push(
//                               context,
//                               MaterialPageRoute(
//                                   builder: (context) => RelatedProductsScreen(
//                                       selectedProductID: selectedProductID)),
//                             );
//                           },
//                         ),
//                       ),
//                     ]);
//               },
//               icon: const Icon(
//                 Icons.more_vert_outlined,
//                 color: AppColors.primaryColor,
//               ),
//             );
//           }),
//         ),
//         Positioned(
//             child: product.discountPercentage > 0
//                 ? Container(
//                     padding: const EdgeInsets.all(5),
//                     decoration: BoxDecoration(
//                       color: AppColors.primaryColor,
//                       borderRadius: BorderRadius.circular(5),
//                     ),
//                     child: Text(
//                       '${product.discountPercentage}% off',
//                       style: const TextStyle(
//                         color: AppColors.AppColor,
//                         fontSize: 10,
//                         fontWeight: FontWeight.bold,
//                       ),
//                     ),
//                   )
//                 : Container())
//       ],
//     ),
//   );
// }
