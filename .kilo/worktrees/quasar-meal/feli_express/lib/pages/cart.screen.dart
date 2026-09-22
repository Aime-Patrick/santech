import 'package:another_flushbar/flushbar.dart';
import 'package:feli_express/models/cart.model.dart';
import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/services/state-management/product.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/productCard.dart';
import 'package:feli_express/widgets/productdialogue.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CartPage extends StatefulWidget {
  final Map<String, dynamic> user;
  const CartPage({Key? key, required this.user}) : super(key: key);

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  @override
  Widget build(BuildContext context) {
    var cartData = context.watch<CartProvider>();
    int totalQuantity = cartData.cartItems.length;
    double totalPrice = cartData.totalPrice as double;
    List<CartItem> allItems = cartData.cartItems;
    final product2 = context.watch<ProductProvider>().products;

    return Scaffold(
      backgroundColor: AppColors.textcolor,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pushNamed(context, '/homepage');
          },
        ),
        title: const Text('Shopping Cart'),
        actions: [
          CircleAvatar(
            backgroundImage: NetworkImage(widget.user['profileImageUrl'] ?? ''),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Container(
          decoration: const BoxDecoration(
            color: AppColors.textcolor,
            borderRadius: BorderRadius.vertical(
              top: Radius.circular(20.0),
            ),
          ),
          child: Column(
            children: [
              Text('Cart Items: $totalQuantity'),
              const SizedBox(height: 20),
              if (allItems.isEmpty)
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        Icons.shopping_cart_outlined,
                        size: 100,
                        color: AppColors.secondaryColor,
                      ),
                      const SizedBox(height: 20),
                      const Text(
                        'Your cart is empty',
                        style: TextStyle(
                            fontSize: 24, color: AppColors.secondaryColor),
                      ),
                      const SizedBox(height: 10),
                      const Text(
                        'If you hesitate to buy a product, add it in your shopping cart first.',
                        style: TextStyle(
                            fontSize: 16, color: AppColors.secondaryColor),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 10),
                      const Text('Other you may like',
                          style: TextStyle(
                              fontSize: 16,
                              color: AppColors.primarytextColor,
                              fontWeight: FontWeight.bold),
                          textAlign: TextAlign.start),
                      const SizedBox(height: 20),
                      Padding(
                        padding: const EdgeInsets.only(left: 8.0),

                        child: product2.isNotEmpty
                            ? Wrap(
                                spacing: 5, // horizontal space between cards
                                runSpacing: 5, // vertical space between lines
                                children: List<Widget>.generate(product2.length,
                                    (index) {
                                  Product product = product2[index];
                                  return GestureDetector(
                                    onTap: () {
                                      MyProductDialogue(context, product);
                                    },
                                    child: productCard(context, product),
                                  );
                                }),
                              )
                            : Container(),
                        // child: GridView.builder(
                        //   gridDelegate:
                        //       SliverGridDelegateWithFixedCrossAxisCount(
                        //     crossAxisCount:
                        //         MediaQuery.of(context).size.width > 600
                        //             ? 4
                        //             : MediaQuery.of(context).size.width > 450
                        //                 ? 3
                        //                 : 2,
                        //     childAspectRatio: 0.7,
                        //   ),
                        //   itemCount: product2.length,
                        //   shrinkWrap: true,
                        //   physics: const NeverScrollableScrollPhysics(),
                        //   itemBuilder: (context, index) {
                        //     Product product = product2[index];
                        //     if (index + 1 < product2.length) {
                        //       return Container(
                        //         height: 320,
                        //         child: Row(
                        //           mainAxisAlignment:
                        //               MainAxisAlignment.spaceBetween,
                        //           children: [
                        //             Expanded(
                        //               child: GestureDetector(
                        //                 onTap: () {
                        //                   MyProductDialogue(context, product);
                        //                 },
                        //                 child: productCard(context, product),
                        //               ),
                        //             ),
                        //             SizedBox(width: 10),
                        //           ],
                        //         ),
                        //       );
                        //     } else if (index < product2.length &&
                        //         product2.length == 1) {
                        //       return Container(
                        //         height: 250,
                        //         child: Row(
                        //           mainAxisAlignment:
                        //               MainAxisAlignment.spaceBetween,
                        //           children: [
                        //             productCard(context, product),
                        //             SizedBox(width: 10),
                        //           ],
                        //         ),
                        //       );
                        //     } else {
                        //       return Container();
                        //     }
                        //   },
                        // ),
                      ),
                    ],
                  ),
                )
              else
                ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: allItems.length,
                  itemBuilder: (context, index) {
                    return Container(
                      margin: const EdgeInsets.all(5),
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: AppColors.secondaryColor,
                            width: 2.0,
                          ),
                        ),
                        borderRadius: BorderRadius.circular(5),
                      ),
                      child: ListTile(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(5),
                        ),
                        leading: Image.network(
                          allItems[index].image,
                          fit: BoxFit.cover,
                          height: 70.0,
                          width: 90.0,
                        ),
                        title: Row(
                          children: [
                            Expanded(
                                child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(allItems[index].name),
                                if ((allItems[index].size) != '') ...[
                                  Text('Size: ${allItems[index].size} ')
                                ],
                                if ((allItems[index].color) != '') ...[
                                  Text('Color: ${allItems[index].color}')
                                ],
                              ],
                            )),
                            IconButton(
                              icon: const Icon(Icons.remove),
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
                            Text(
                                '${context.read<CartProvider>().totalSimilarItems(allItems[index].id as String)}'),
                            IconButton(
                                icon: const Icon(Icons.add),
                                onPressed: () {
                                  try {
                                    bool isIncreased = context
                                        .read<CartProvider>()
                                        .increaseQuantityByCart(
                                            allItems[index]);
                                    if (!isIncreased) {
                                      Flushbar(
                                        message:
                                            'No more stock available for this product',
                                        padding: const EdgeInsets.all(10),
                                        maxWidth: 200,
                                        flushbarPosition: FlushbarPosition.TOP,
                                        backgroundColor: AppColors.primaryColor,
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(10)),
                                        duration: const Duration(seconds: 3),
                                      ).show(context);
                                    }
                                  } catch (e) {
                                    print('Error increasing quantity: $e');
                                  }
                                }),
                            IconButton(
                              onPressed: () {
                                try {
                                  context
                                      .read<CartProvider>()
                                      .removeFromCart(allItems[index]);
                                } catch (e) {
                                  print('Error removing item: $e');
                                }
                              },
                              icon: const Icon(
                                Icons.delete,
                                color: AppColors.errorcolor,
                              ),
                            )
                          ],
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            if (allItems[index].discountPercentage > 0)
                              Text(
                                'Origina Price: ${allItems[index].priceAsDouble * allItems[index].quantity} RWF',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                  color: allItems[index].discountPercentage > 0
                                      ? AppColors.errorcolor
                                      : AppColors.primarytextColor,
                                  decoration:
                                      allItems[index].discountPercentage > 0
                                          ? TextDecoration.lineThrough
                                          : TextDecoration.none,
                                ),
                              ),
                            Text(
                              'Price: ${allItems[index].discountedPrice * allItems[index].quantity} RWF',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: AppColors.primaryColor,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: SizedBox(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  "Total: $totalPrice RWF",
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  // Implement checkout functionality
                  Navigator.pushNamed(context, '/checkout');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primaryColor,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 30, vertical: 5.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5),
                  ),
                ),
                child: const Text(
                  'Checkout',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 14,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
