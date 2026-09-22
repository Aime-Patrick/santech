import 'package:feli_express/functions/Apis/product.api.dart';
import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/pages/homepage.dart';
import 'package:feli_express/services/state-management/product.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/productCard.dart';
import 'package:feli_express/widgets/productdialogue.dart';
import 'package:feli_express/widgets/searchbar.dart';
import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:provider/provider.dart';

class RelatedProductsScreen extends StatefulWidget {
  final String selectedProductID;

  const RelatedProductsScreen({Key? key, required this.selectedProductID})
      : super(key: key);

  @override
  State<RelatedProductsScreen> createState() => _RelatedProductsScreenState();
}

class _RelatedProductsScreenState extends State<RelatedProductsScreen> {
  List<Product> categories = [];
  List<Product> filteredCategories = [];
  String selectedCategory = 'All';
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchProducts();
    selectedCategory = widget.selectedProductID;
  }

  Future<void> fetchProducts() async {
    try {
      List<Product> fetchedProducts = await ProductController().getProduct();

      //int the Category of the selected product
      String selectedCategory = fetchedProducts
          .firstWhere((product) => product.id == widget.selectedProductID)
          .category;
      //.name;

      setState(() {
        categories = fetchedProducts;
        filteredCategories = fetchedProducts
            .where((product) =>
                selectedCategory == 'All' ||
                product.category == selectedCategory)
            .toList();
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      print('Error fetching products: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    var selectedindex = 0;

    void onTabTapped(int index) {
      setState(() {
        selectedindex = index;
      });
    }

    List<String> searchResults = [];
    final product2 = context.watch<ProductProvider>().products;

    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: SearchBarWidget(
          product2: product2,
        ),
        leading: IconButton(
          onPressed: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => const MyhomePage()));
          },
          icon: const Icon(
            Icons.home,
          ),
          color: AppColors.primaryColor,
        ),
      ),
      body: isLoading
          ? Center(
              child: LoadingAnimationWidget.bouncingBall(
                color: AppColors.primaryColor,
                size: 80,
              ),
            )
          : SingleChildScrollView(
              child: Column(
                children: [
                  const Center(
                    child: Text(
                      'Related Products',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Wrap(
                    spacing: 5, // horizontal space between cards
                    runSpacing: 5, // vertical space between lines
                    children: List<Widget>.generate(product2.length, (index) {
                      Product product = product2[index];
                      return GestureDetector(
                        onTap: () {
                          MyProductDialogue(context, product);
                        },
                        child: productCard(context, product),
                      );
                    }),
                  ),

                  // GridView.builder(
                  //   gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  //     crossAxisCount: MediaQuery.of(context).size.width > 600
                  //         ? 4
                  //         : MediaQuery.of(context).size.width > 450
                  //             ? 3
                  //             : 2,
                  //     childAspectRatio: 0.7,
                  //   ),
                  //   itemCount: product2.length,
                  //   shrinkWrap: true,
                  //   physics: const NeverScrollableScrollPhysics(),
                  //   itemBuilder: (context, index) {
                  //     Product product = product2[index];
                  //     if (index + 1 < product2.length) {
                  //       return Row(
                  //         mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  //         children: [
                  //           Expanded(
                  //             child: GestureDetector(
                  //               onTap: () {
                  //                 MyProductDialogue(context, product);
                  //               },
                  //               child: productCard(context, product),
                  //             ),
                  //           ),
                  //           SizedBox(width: 10),
                  //         ],
                  //       );
                  //     } else if (index < product2.length &&
                  //         product2.length == 1) {
                  //       return Row(
                  //         mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  //         children: [
                  //           productCard(context, product),
                  //           SizedBox(width: 10),
                  //         ],
                  //       );
                  //     } else {
                  //       return Container();
                  //     }
                  //   },
                  // ),
                ],
              ),
            ),
    );
  }
}
