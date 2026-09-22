import 'package:another_flushbar/flushbar.dart';
import 'package:feli_express/models/cart.model.dart';
import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/services/state-management/product.provider.dart';
import 'package:feli_express/services/state-management/wishlist.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/product.image.dart';
import 'package:feli_express/widgets/productcolor.box.dart';
import 'package:feli_express/widgets/sizebox.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:html/dom.dart' as dom;
import 'package:html/parser.dart' as htmlparser;
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

void MyProductDialogue(BuildContext context, Product product) {
  print('single ${product}');

  var cartData = context.read<CartProvider>();
  bool isInCart = cartData.cartItems.any((element) => element.id == product.id);
  bool hascolor = product.hasColors;
  bool hasSize = product.hasMeasurements;
  var screenSize = MediaQuery.of(context).size;
  String selectedCategory = '';
  String selectedProductID = product.id!;
  double imageWidth = MediaQuery.of(context).orientation == Orientation.portrait
      ? screenSize.width
      : screenSize.width;
  List<CartItem> allItems = cartData.cartItems;
  int index = allItems.indexWhere((element) => element.id == product.id);

// handle  html from backend server
  dom.Document document = htmlparser.parse(product.description);

  Widget html = Html(data: product.description);

  var selectedColor = "";
  var selectedImage = product.productImages!.productThumbnail.url;
  var selecterSize = "";
  var selectedqty = 0;
  var selectedindex = 0;
  final controller = AnimationController(
    vsync: Navigator.of(context),
    duration: const Duration(seconds: 5),
  );
  final scaleAnimation = Tween<double>(
    begin: 3.0,
    end: 6.0,
  ).animate(
    CurvedAnimation(
      parent: controller,
      curve: Curves.fastOutSlowIn,
    ),
  );
  bool isZoomed = false;
  int totalQuantity = cartData.cartItems.length;
  double totalPrice = cartData.totalPrice as double;
  final product2 =
      Provider.of<ProductProvider>(context, listen: false).products;
  String totalItems = '';
  final Uri whatsApp = Uri.parse('https://wa.me/250798697197');

  int itemqty = context.read<CartProvider>().getQuantity(product.id);

  try {
    showDialog(
      barrierColor: Colors.black.withOpacity(0.5),
      context: context,
      barrierDismissible: false,
      barrierLabel: MaterialLocalizations.of(context).modalBarrierDismissLabel,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            void updateSize(String? newSize) {
              setState(() {
                selecterSize = newSize ?? '';
              });
            }

            void updateqty(int qty) {
              setState(() => {selectedqty = qty});
            }

            void updateColor(String newColor) {
              setState(() {
                selectedColor = newColor;
              });
            }

            void updateImage(String newImage) {
              setState(() {
                selectedImage = newImage;
              });
            }

            void onTabTapped(int index) {
              setState(() {
                selectedindex = index;
              });
            }

            final isInWishlist =
                context.read<WishlistProvider>().wishlist.contains(product);

            return Dialog(
              backgroundColor: AppColors.secondaryColor,
              insetPadding: EdgeInsets.zero,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Expanded(
                    child: SingleChildScrollView(
                      child: Padding(
                        padding: const EdgeInsets.all(0.0),
                        child: Column(
                          children: [
                            Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    IconButton(
                                      icon: Icon(Icons.arrow_back),
                                      onPressed: () {
                                        Navigator.of(context)
                                            .pop(); // Close the dialog
                                      },
                                    ),
                                    IconButton(
                                      icon: Icon(
                                        isInWishlist
                                            ? Icons.favorite
                                            : Icons.favorite_border,
                                        color: isInWishlist
                                            ? AppColors.errorcolor
                                            : AppColors.primaryColor,
                                      ),
                                      onPressed: () {
                                        setState(() {
                                          try {
                                            var wishlistProvider = context
                                                .read<WishlistProvider>();
                                            if (wishlistProvider.wishlist
                                                .contains(product)) {
                                              wishlistProvider
                                                  .removeProduct(product);
                                              Flushbar(
                                                backgroundColor:
                                                    AppColors.primaryColor,
                                                padding:
                                                    const EdgeInsets.all(10),
                                                maxWidth: 200,
                                                borderRadius: BorderRadius.all(
                                                    Radius.circular(10)),
                                                flushbarPosition:
                                                    FlushbarPosition.TOP,
                                                message:
                                                    'Product removed from wishlist',
                                                duration:
                                                    const Duration(seconds: 3),
                                              ).show(context);
                                            } else {
                                              wishlistProvider
                                                  .addProduct(product);
                                              Flushbar(
                                                backgroundColor:
                                                    AppColors.primaryColor,
                                                padding:
                                                    const EdgeInsets.all(10),
                                                maxWidth: 200,
                                                borderRadius: BorderRadius.all(
                                                    Radius.circular(10)),
                                                flushbarPosition:
                                                    FlushbarPosition.TOP,
                                                message:
                                                    'Product added to wishlist',
                                                duration:
                                                    const Duration(seconds: 3),
                                              ).show(context);
                                            }
                                          } catch (e) {
                                            print('Error: $e');
                                          }
                                        });
                                      },
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 20),
                                Text(
                                  '${product.name}',
                                  style: const TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                      color: AppColors.primaryColor),
                                ),
                                Text(
                                  '\RWF ${product.price}',
                                  style: const TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      color: AppColors.errorcolor),
                                ),
                                const SizedBox(height: 70),
                                GestureDetector(
                                  onTap: () {
                                    setState(() {
                                      isZoomed = !isZoomed;
                                    });
                                    controller.forward();
                                    Future.delayed(const Duration(seconds: 5),
                                        () {
                                      setState(() {
                                        isZoomed = false;
                                      });
                                      controller.reverse();
                                    });
                                  },
                                  onLongPress: () {
                                    setState(() {
                                      isZoomed = true;
                                    });
                                    controller.forward();
                                    Future.delayed(const Duration(seconds: 5),
                                        () {
                                      setState(() {
                                        isZoomed = false;
                                      });

                                      controller.reverse();
                                    });
                                  },
                                  onLongPressEnd: (details) {
                                    controller.reverse();
                                  },
                                  child: ScaleTransition(
                                    scale: scaleAnimation,
                                    child: Image.network(
                                      '${selectedImage.isEmpty ? product.productImages!.productThumbnail.url : selectedImage}',
                                      height: 70,
                                      width: 100,
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 50.0),
                              ],
                            ),
                            Visibility(
                                visible: !isZoomed,
                                child: ProductImage(
                                    context, product, updateImage)),
                            SizedBox(height: 30.0),
                            Visibility(
                              visible: !isZoomed,
                              child: Column(
                                children: [
                                  ProductColors(
                                      product: product,
                                      onImageSelected: updateImage,
                                      onColorSelected: updateColor,
                                      onSizeSelected: updateSize,
                                      onQtySelected: updateqty),
                                  const SizedBox(height: 10.0),
                                  const Text(
                                    'Sizes & Qty',
                                    style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.primarytextColor),
                                  ),
                                  const SizedBox(height: 0.0),
                                  product.hasColors == true
                                      ? sizeBox(
                                          context,
                                          product,
                                        )
                                      : SizeBoxWidget(
                                          product: product,
                                          onSizeSelected: updateSize,
                                          onQtySelected: updateqty),
                                  SizedBox(height: 10.0),
                                ],
                              ),
                            ),
                            SingleChildScrollView(
                              child: Container(
                                padding: EdgeInsets.all(20.0),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Align(
                                      alignment: Alignment.centerLeft,
                                      child: Text(
                                        "Quantity : ${context.watch<CartProvider>().getQuantity(product.id)}  ${context.watch<CartProvider>().getCartItemSize(product.id)}  ${context.watch<CartProvider>().getCartItemColor(product.id)} In Cart",
                                        style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                            color: AppColors.primarytextColor),
                                      ),
                                    ),
                                    const SizedBox(height: 10),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.start,
                                      children: [
                                        if (index !=
                                            -1) // Ensure the index is valid
                                          Row(
                                            children: [
                                              IconButton(
                                                onPressed: () {
                                                  setState(() {
                                                    if (allItems[index]
                                                            .quantity >
                                                        1) {
                                                      allItems[index]
                                                          .quantity--;
                                                      totalQuantity--;
                                                      totalPrice -=
                                                          allItems[index].price;
                                                    }
                                                  });
                                                },
                                                icon: const Icon(Icons.remove),
                                              ),
                                              Text(
                                                  '${allItems[index].quantity}'),
                                              IconButton(
                                                onPressed: () {
                                                  setState(() {
                                                    allItems[index].quantity++;
                                                    totalQuantity++;
                                                    totalPrice +=
                                                        allItems[index].price;
                                                  });
                                                },
                                                icon: const Icon(Icons.add),
                                              ),
                                            ],
                                          )
                                        else
                                          Row(
                                            children: [
                                              IconButton(
                                                onPressed: () {
                                                  try {
                                                    if (context
                                                            .read<
                                                                CartProvider>()
                                                            .getQuantity(
                                                                product.id) >
                                                        0) {
                                                      var cartItem = context
                                                          .read<CartProvider>()
                                                          .cartItems
                                                          .firstWhere((item) =>
                                                              item.id ==
                                                              product.id);
                                                      context
                                                          .read<CartProvider>()
                                                          .decreaseQuantityByCart(
                                                              cartItem);
                                                    } else {}
                                                  } catch (e) {
                                                    print(
                                                        'Error decreasing quantity: $e');
                                                  }
                                                },
                                                icon: const Icon(Icons.remove),
                                              ),
                                              Text(
                                                  '${context.watch<CartProvider>().getQuantity(product.id)}'),
                                              IconButton(
                                                onPressed: () {
                                                  if (context
                                                              .read<
                                                                  CartProvider>()
                                                              .getQuantity(
                                                                  product.id) <
                                                          product
                                                              .stockQuantity &&
                                                      (!isInCart &&
                                                          (!hasSize &&
                                                              !hascolor))) {
                                                    print(
                                                        "isincartno1 $isInCart hasSize $hasSize hascolor $hascolor");
                                                    setState(() {
                                                      context
                                                          .read<CartProvider>()
                                                          .addToCart(product,
                                                              '', '', null);
                                                    });
                                                  } else if (context
                                                              .read<
                                                                  CartProvider>()
                                                              .getQuantity(
                                                                  product.id) <
                                                          product
                                                              .stockQuantity &&
                                                      (!isInCart &&
                                                          (hasSize ||
                                                              hascolor))) {
                                                    if (selectedColor.isEmpty &&
                                                        selecterSize.isEmpty) {
                                                      Flushbar(
                                                        backgroundColor:
                                                            AppColors
                                                                .primaryColor,
                                                        padding:
                                                            const EdgeInsets
                                                                .all(10),
                                                        maxWidth: 200,
                                                        borderRadius:
                                                            BorderRadius.all(
                                                                Radius.circular(
                                                                    10)),
                                                        flushbarPosition:
                                                            FlushbarPosition
                                                                .TOP,
                                                        message:
                                                            'Please select product size or image',
                                                        duration:
                                                            const Duration(
                                                                seconds: 3),
                                                      ).show(context);
                                                    } else if (selectedColor
                                                                .isEmpty &&
                                                            selecterSize
                                                                .isEmpty ||
                                                        context
                                                                .read<
                                                                    CartProvider>()
                                                                .getQuantity(
                                                                    product
                                                                        .id) ==
                                                            selectedqty) {
                                                      Flushbar(
                                                        backgroundColor:
                                                            AppColors
                                                                .primaryColor,
                                                        padding:
                                                            const EdgeInsets
                                                                .all(10),
                                                        maxWidth: 200,
                                                        borderRadius:
                                                            BorderRadius.all(
                                                                Radius.circular(
                                                                    10)),
                                                        flushbarPosition:
                                                            FlushbarPosition
                                                                .TOP,
                                                        message:
                                                            'No more stock available for this product',
                                                        duration:
                                                            const Duration(
                                                                seconds: 3),
                                                      ).show(context);
                                                    } else {
                                                      print(
                                                          "isincartno2 $isInCart hasSize $hasSize hascolor $hascolor");
                                                      setState(() {
                                                        context
                                                            .read<
                                                                CartProvider>()
                                                            .addToCart(
                                                                product,
                                                                selectedColor,
                                                                selecterSize,
                                                                selectedImage);
                                                      });
                                                    }
                                                  } else {
                                                    Flushbar(
                                                      backgroundColor: AppColors
                                                          .primaryColor,
                                                      padding:
                                                          const EdgeInsets.all(
                                                              10),
                                                      maxWidth: 200,
                                                      borderRadius:
                                                          BorderRadius.all(
                                                              Radius.circular(
                                                                  10)),
                                                      flushbarPosition:
                                                          FlushbarPosition.TOP,
                                                      message:
                                                          'No more stock available for this product',
                                                      duration: const Duration(
                                                          seconds: 3),
                                                    ).show(context);
                                                  }
                                                },
                                                icon: const Icon(Icons.add),
                                              ),
                                            ],
                                          ),
                                        SizedBox(height: 20),
                                        Text(
                                          '${product.hasColors && selectedColor.isNotEmpty ? selectedqty : product.stockQuantity}  available',
                                          style: const TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.bold,
                                              color:
                                                  AppColors.primarytextColor),
                                        ),
                                      ],
                                    ),

                                    const SizedBox(height: 20),
                                    // Container(
                                    //     //color: AppColors.secondaryColor,
                                    //     height: 150,
                                    //     width: 300,
                                    //     decoration: const BoxDecoration(
                                    //       //color: AppColors.secondaryColor,
                                    //       boxShadow: [
                                    //         BoxShadow(
                                    //           color: AppColors.secondaryColor,
                                    //           blurRadius: 10,
                                    //           spreadRadius: 5,
                                    //           offset: Offset(0, 3),
                                    //         ),
                                    //       ],
                                    //       borderRadius: BorderRadius.all(
                                    //           Radius.circular(10)),
                                    //     ),
                                    //     padding: const EdgeInsets.all(10),
                                    //     child: Column(
                                    //       mainAxisAlignment:
                                    //           MainAxisAlignment.start,
                                    //       crossAxisAlignment:
                                    //           CrossAxisAlignment.start,
                                    //       children: [
                                    //         Text('Brand: ${"brandname"}',
                                    //             style: const TextStyle(
                                    //                 fontSize: 12,
                                    //                 fontWeight: FontWeight.bold,
                                    //                 color: AppColors
                                    //                     .primarytextColor)),
                                    //         const SizedBox(height: 10),
                                    //         Text(
                                    //             'Color: ${product.colorMeasurementVariations?.variations?[int.tryParse(selectedColor) ?? 0] ?? ''}'),
                                    //         const SizedBox(width: 20),
                                    //         Text(
                                    //             'Size: ${product.colorMeasurementVariations?.variations?[selectedindex]?.measurementvalue ?? ''}'),
                                    //       ],
                                    //     )),
                                    // const SizedBox(height: 20),

                                    const Align(
                                      alignment: Alignment.centerLeft,
                                      child: Text(
                                        'More Info',
                                        style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                            color: AppColors.primarytextColor),
                                      ),
                                    ),
                                    const SizedBox(height: 10),
                                    Container(
                                      decoration: const BoxDecoration(
                                        //color: AppColors.secondaryColor,
                                        boxShadow: [
                                          BoxShadow(
                                            color: AppColors.secondaryColor,
                                            blurRadius: 10,
                                            spreadRadius: 5,
                                            offset: Offset(0, 3),
                                          ),
                                        ],
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(10)),
                                      ),
                                      child: Html(
                                        data: product
                                            .description, // Your HTML content as a string
                                        style: {
                                          "html": Style(
                                            fontSize: FontSize(14.0),
                                            // fontWeight: FontWeight.bold,
                                            color: AppColors.primarytextColor,
                                          ),
                                        },
                                      ),
                                    ),
                                    // Text(
                                    //   '  ${html}  ',
                                    //   textAlign: TextAlign.start,
                                    //   style: const TextStyle(
                                    //       fontSize: 12,
                                    //       fontWeight: FontWeight.bold,
                                    //       color:
                                    //           Color.fromARGB(255, 221, 20, 20)),
                                    // ),
                                    const SizedBox(height: 20),

                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        ElevatedButton(
                                          onPressed: () async {
                                            if (Provider.of<CartProvider>(
                                                        context,
                                                        listen: false)
                                                    .getQuantity(product.id) >
                                                0) {
                                              Navigator.pushNamed(
                                                  context, '/cart');
                                            } else {
                                              // Provider.of<CartProvider>(context,
                                              //         listen: false)
                                              //     .addToCart(product);

                                              Navigator.pushNamed(
                                                  context, '/cart');
                                            }
                                          },
                                          style: ElevatedButton.styleFrom(
                                            backgroundColor:
                                                AppColors.primaryColor,
                                            shape: RoundedRectangleBorder(
                                              borderRadius:
                                                  BorderRadius.circular(5),
                                            ),
                                          ),
                                          child: const Text('Buy now',
                                              style: TextStyle(
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.bold,
                                                  color: AppColors.AppColor)),
                                        ),
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            IconButton(
                                              onPressed: () async {
                                                await launch(
                                                    whatsApp.toString());
                                              },
                                              icon: const Icon(
                                                  FontAwesomeIcons.whatsapp,
                                                  size: 50,
                                                  color:
                                                      AppColors.primaryColor),
                                            ),
                                            const Text(
                                              'Reach to us',
                                              style: TextStyle(
                                                  fontSize: 12,
                                                  fontWeight: FontWeight.bold,
                                                  color: AppColors
                                                      .primarytextColor),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  } catch (e) {
    print('Error: $e');
  }
}
