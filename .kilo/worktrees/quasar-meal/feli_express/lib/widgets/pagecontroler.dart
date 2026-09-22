import 'dart:async';

import 'package:another_flushbar/flushbar.dart';
import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/productdialogue.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:provider/provider.dart';

class MyAutomaticScrolling extends HookWidget {
  final Future<List<Product>> products;

  MyAutomaticScrolling({required this.products});

  @override
  Widget build(BuildContext context) {
    final _pageController = usePageController();
    final _currentPage = useState(0);
    final _currentProduct =
        useState<Product?>(null); // State to keep track of the current product

    useEffect(() {
      final _timer = Timer.periodic(const Duration(seconds: 4), (Timer timer) {
        if (_pageController.hasClients) {
          if (_currentPage.value < 10 - 1) {
            _currentPage.value++;
          } else {
            _currentPage.value = 0;
          }
          _pageController.animateToPage(
            _currentPage.value,
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeIn,
          );
        }
      });

      return () {
        _timer.cancel();
        _pageController.dispose();
      };
    }, const []);

    return FutureBuilder<List<Product>>(
      future: products,
      builder: (BuildContext context, AsyncSnapshot<List<Product>> snapshot) {
        if (snapshot.hasData) {
          // Update the current product based on page changes
          _pageController.addListener(() {
            final _pageIndex = _pageController.page?.round();
            if (_pageIndex != null && snapshot.data!.isNotEmpty) {
              _currentProduct.value = snapshot.data![_pageIndex];
            }
          });
          final Product product = snapshot.data![_currentPage.value];

          return Column(children: [
            Expanded(
                child: Stack(
              children: [
                PageView(
                  controller: _pageController,
                  children: snapshot.data!
                      .map<Widget>((product) =>
                          Cardwidget(product)) // Explicitly map to List<Widget>
                      .toList(),
                ),
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Padding(
                    padding: EdgeInsets.only(bottom: 20, left: 170),
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primaryColor,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      onPressed: () {
                        if (_currentProduct.value != null) {
                          MyProductDialogue(context, product);
                          Flushbar(
                            message:
                                'Please select a size & color for this product ',
                            duration: const Duration(seconds: 5),
                            flushbarPosition: FlushbarPosition.TOP,
                            margin: const EdgeInsets.all(8),
                            padding: const EdgeInsets.all(10),
                            maxWidth: 200,
                            borderRadius: BorderRadius.all(Radius.circular(8)),
                            backgroundColor: AppColors.primaryColor,
                          ).show(context);
                        }

                        Flushbar(
                          title: 'Product added to cart',
                          message: 'Product added to cart successfully',
                          duration: Duration(seconds: 3),
                        )..show(context);
                      },
                      child: const Text(
                        'Shop Now',
                        style: TextStyle(
                          color: AppColors.AppColor,
                          fontSize: 15,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ))
          ]);
        } else if (snapshot.hasError) {
          return Container(
              child: Center(
                  child: Text(
            '404 Something went wrong',
            style: TextStyle(
                color: AppColors.primaryColor,
                fontSize: 15,
                fontWeight: FontWeight.bold),
          )));
        } else {
          return Transform.scale(
              scale: 0.3,
              child: Container(
                  child: Center(
                      child: LoadingAnimationWidget.prograssiveDots(
                color: AppColors.primaryColor,
                size: 200,
              ))));
        }
      },
    );
  }

  Cardwidget(Product product) => Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: AppColors.AppColor,
        ),
        child: Stack(children: [
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              image: DecorationImage(
                image: NetworkImage(
                    product.productImages!.productThumbnail.url.toString()),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              gradient: LinearGradient(
                begin: Alignment.centerRight,
                end: Alignment.centerLeft,
                colors: [
                  Colors.black.withOpacity(1),
                  Colors.transparent,
                ],
              ),
            ),
          ),
        ]),
      );
}

// class MyAutomaticScrolling extends HookWidget {
//   final Future<List<Product>> products;

//   MyAutomaticScrolling({required this.products});

//   @override
//   Widget build(BuildContext context) {
//     final _pageController = usePageController();
//     final _currentPage = useState(0);
//     final _currentProduct = useState<Product?>(null);
//     final productsList =
//         useState<List<Product>?>(null); // State to hold the product list

//     // Use FutureBuilder to fetch products
//     useEffect(() {
//       // Fetch products and store in productsList
//       products.then((value) {
//         productsList.value = value;
//       });
//       return null; // No cleanup needed for this effect
//     }, [products]);

//     // Timer to auto-scroll
//     useEffect(() {
//       if (productsList.value != null) {
//         final _timer =
//             Timer.periodic(const Duration(seconds: 4), (Timer timer) {
//           if (_pageController.hasClients) {
//             if (_currentPage.value < productsList.value!.length - 1) {
//               _currentPage.value++;
//             } else {
//               _currentPage.value = 0;
//             }
//             _pageController.animateToPage(
//               _currentPage.value,
//               duration: const Duration(milliseconds: 200),
//               curve: Curves.easeIn,
//             );
//           }
//         });

//         return () {
//           _timer.cancel();
//         };
//       }
//       return null; // No cleanup needed if productsList is null
//     }, [productsList.value]);

//     return FutureBuilder<List<Product>>(
//       future: products,
//       builder: (BuildContext context, AsyncSnapshot<List<Product>> snapshot) {
//         if (snapshot.connectionState == ConnectionState.waiting) {
//           return Center(child: CircularProgressIndicator());
//         } else if (snapshot.hasError) {
//           return Center(child: Text('Error: ${snapshot.error}'));
//         } else if (snapshot.hasData) {
//           final productList = snapshot.data!;
//           _currentProduct.value = productList[_currentPage.value];

//           return Column(children: [
//             Expanded(
//               child: Stack(
//                 children: [
//                   PageView(
//                     controller: _pageController,
//                     children: productList
//                         .map<Widget>((product) => Cardwidget(product))
//                         .toList(),
//                   ),
//                   Align(
//                     alignment: Alignment.bottomCenter,
//                     child: Padding(
//                       padding: EdgeInsets.only(bottom: 20, left: 170),
//                       child: ElevatedButton(
//                         style: ElevatedButton.styleFrom(
//                           backgroundColor: AppColors.primaryColor,
//                           shape: RoundedRectangleBorder(
//                             borderRadius: BorderRadius.circular(10),
//                           ),
//                         ),
//                         onPressed: () {
//                           if (_currentProduct.value != null) {
//                             context.read<CartProvider>().addToCart(
//                                 _currentProduct.value!, '', '', null);
//                             Navigator.pushNamed(context, '/cart');
//                           }
//                         },
//                         child: const Text(
//                           'Shop Now',
//                           style: TextStyle(
//                             color: AppColors.AppColor,
//                             fontSize: 15,
//                           ),
//                         ),
//                       ),
//                     ),
//                   ),
//                 ],
//               ),
//             )
//           ]);
//         }
//         return Container(); // Fallback for any unexpected state
//       },
//     );
//   }

//   Cardwidget(Product product) => Container(
//         decoration: BoxDecoration(
//           borderRadius: BorderRadius.circular(20),
//           color: AppColors.AppColor,
//         ),
//         child: Stack(children: [
//           Container(
//             decoration: BoxDecoration(
//               borderRadius: BorderRadius.circular(20),
//               image: DecorationImage(
//                 image: NetworkImage(
//                     product.productImages!.productThumbnail.url.toString()),
//                 fit: BoxFit.cover,
//               ),
//             ),
//           ),
//           Container(
//             decoration: BoxDecoration(
//               borderRadius: BorderRadius.circular(20),
//               gradient: LinearGradient(
//                 begin: Alignment.centerRight,
//                 end: Alignment.centerLeft,
//                 colors: [
//                   Colors.black.withOpacity(1),
//                   Colors.transparent,
//                 ],
//               ),
//             ),
//           ),
//         ]),
//       );
// }
