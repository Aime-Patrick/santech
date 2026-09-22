import 'package:feli_express/models/category.model.dart' as category;
import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/models/productclass.model.dart' as pc;
import 'package:feli_express/models/subcategory.model.dart';
import 'package:feli_express/services/state-management/category.provider.dart';
import 'package:feli_express/services/state-management/product-class.provider.dart';
import 'package:feli_express/services/state-management/product.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/productCard.dart';
import 'package:feli_express/widgets/productdialogue.dart';
import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:provider/provider.dart';
import 'package:vs_scrollbar/vs_scrollbar.dart';

class ProductPage extends StatefulWidget {
  final String? selectedProductClassId;
  final String? selectedProductClassName;
  final String? selectedCategoryId;
  final String? selectedCategoryName;
  final String? selectedSubCategoryId;
  final String? selectedSubCategoryName;
  final String? selectedBrandId;
  final String? selectedBrandName;

  const ProductPage({
    super.key,
    this.selectedProductClassId,
    this.selectedProductClassName,
    this.selectedCategoryId,
    this.selectedCategoryName,
    this.selectedSubCategoryId,
    this.selectedSubCategoryName,
    this.selectedBrandId,
    this.selectedBrandName,
  });

  @override
  State<ProductPage> createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  ScrollController _scrollController = ScrollController();
  late List<Product> product2;
  late List<Product> filteredProducts;
  late List<SubCategory> subCategories = [];
  List<pc.ProductClass> productClasses = [];
  List<category.Category> category_provider = [];
  var categories;
  var subcategories;
  var brands;

  late String selectedProductClassId = 'All';
  late String selectedProductClassName = 'All';

  late String selectedCategoryId = 'All';
  late String selectedCategoryName = 'All';

  late String selectedSubCategoryId = 'All';
  late String selectedSubCategoryName = 'All';

  late String selectedBrandName = 'All';
  late String selectedBrandId = 'All';

  @override
  void initState() {
    super.initState();
    productClasses = context.read<ProductClassProvider>().productsclass;
    category_provider =
        context.read<ProductCategoryProvider>().productscategories;
    product2 = context.read<ProductProvider>().products;
    filteredProducts = product2;
    print(
        "valuepassed on sidebar ${widget.selectedProductClassId}  ${widget.selectedProductClassName}");
    if (widget.selectedProductClassId != null) {
      setState(() {
        selectedProductClassId = widget.selectedProductClassId ?? 'All';
        selectedProductClassName = widget.selectedProductClassName ?? 'All';
        selectedCategoryId = widget.selectedCategoryId ?? 'All';
        selectedCategoryName = widget.selectedCategoryName ?? 'All';
        selectedSubCategoryId = widget.selectedSubCategoryId ?? 'All';
        selectedSubCategoryName = widget.selectedSubCategoryName ?? 'All';
        selectedBrandName = widget.selectedBrandName ?? 'All';
        selectedBrandId = widget.selectedBrandId ?? 'All';
        handleProductClassChange(widget.selectedProductClassId);
      });
    }
    if (widget.selectedProductClassId != null &&
        widget.selectedCategoryId != null &&
        widget.selectedCategoryId != 'All') {
      setState(() {
        selectedProductClassId = widget.selectedProductClassId ?? 'All';
        selectedProductClassName = widget.selectedProductClassName ?? 'All';
        selectedCategoryId = widget.selectedCategoryId ?? 'All';
        selectedCategoryName = widget.selectedCategoryName ?? 'All';
        selectedSubCategoryId = widget.selectedSubCategoryId ?? 'All';
        selectedSubCategoryName = widget.selectedSubCategoryName ?? 'All';
        selectedBrandName = widget.selectedBrandName ?? 'All';
        selectedBrandId = widget.selectedBrandId ?? 'All';

        updateCategories(productClassId: widget.selectedProductClassId);
        filteredProducts = product2.where((product) {
          return product.productClass == widget.selectedProductClassId &&
              product.category == widget.selectedCategoryId;
        }).toList();
      });
    }

    // brands

    if (widget.selectedProductClassId != null &&
        widget.selectedBrandId != null &&
        widget.selectedBrandId != 'All') {
      setState(() {
        selectedProductClassId = widget.selectedProductClassId ?? 'All';
        selectedProductClassName = widget.selectedProductClassName ?? 'All';
        selectedCategoryId = widget.selectedCategoryId ?? 'All';
        selectedCategoryName = widget.selectedCategoryName ?? 'All';
        selectedSubCategoryId = widget.selectedSubCategoryId ?? 'All';
        selectedSubCategoryName = widget.selectedSubCategoryName ?? 'All';
        selectedBrandName = widget.selectedBrandName ?? 'All';
        selectedBrandId = widget.selectedBrandId ?? 'All';

        updateBrands(productClassId: widget.selectedProductClassId);
        filteredProducts = product2.where((product) {
          return product.productClass == widget.selectedProductClassId &&
              product.brand == widget.selectedBrandId;
        }).toList();
      });
    }

    // subcategorie
    if (widget.selectedProductClassId != null &&
        widget.selectedCategoryId != null &&
        widget.selectedCategoryId != 'All' &&
        widget.selectedSubCategoryId != null &&
        widget.selectedSubCategoryId != 'All') {
      setState(() {
        selectedProductClassId = widget.selectedProductClassId ?? 'All';
        selectedProductClassName = widget.selectedProductClassName ?? 'All';
        selectedCategoryId = widget.selectedCategoryId ?? 'All';
        selectedCategoryName = widget.selectedCategoryName ?? 'All';
        selectedSubCategoryId = widget.selectedSubCategoryId ?? 'All';
        selectedSubCategoryName = widget.selectedSubCategoryName ?? 'All';
        selectedBrandName = widget.selectedBrandName ?? 'All';
        selectedBrandId = widget.selectedBrandId ?? 'All';

        updateSubCategories(categoryId: widget.selectedCategoryId);
        filteredProducts = product2.where((product) {
          return product.productClass == widget.selectedProductClassId &&
              product.category == widget.selectedCategoryId &&
              product.subCategory == widget.selectedSubCategoryId;
        }).toList();
      });
    }
  }

  void handleProductClassChange(String? value) {
    if (value != null && value != "All") {
      var productClass =
          productClasses.where((element) => element.id == value).first;
      if (productClass != null) {
        setState(() {
          selectedProductClassId = value;
          selectedProductClassName = productClass.name;
          selectedCategoryId = 'All';
          selectedCategoryName = 'All';

          subCategories = [];

          updateCategories(productClassId: value);
          updateBrands(productClassId: value);
          filteredProducts = product2.where((product) {
            return product.productClass == value;
          }).toList();
          print("filteredProducts on update state ${filteredProducts.length} ");
        });
      } else {}
    } else {
      setState(() {
        selectedProductClassId = 'All';
        selectedProductClassName = 'All';
        selectedCategoryName = 'All';
        selectedCategoryId = 'All';
        subCategories = [];
        categories = [];
        brands = [];

        selectedBrandId = 'All';
        selectedBrandName = 'All';
        filteredProducts = product2;
      });
    }
  }

  void updateCategories({String? productClassId}) {
    setState(() {
      categories = productClasses
          .firstWhere((productClass) => productClass.id == productClassId)
          .categories;
    });
  }

  void updateBrands({String? productClassId}) {
    setState(() {
      brands = productClasses
          .firstWhere((productClass) => productClass.id == productClassId)
          .brands;
    });
  }

  void updateSubCategories({String? categoryId}) {
    setState(() {
      if ((selectedCategoryId != null || selectedCategoryId != 'All') &&
          categoryId != 'All' &&
          categoryId != null) {
        subCategories = category_provider
            .firstWhere((category) => category.id == categoryId)
            .subCategories!;
      } else if (selectedCategoryId == null) {
        subCategories = [];
      }
    });
  }

  bool isLoading = false;
  late ProductClass? SelectedProductClass;

  @override
  Widget build(BuildContext context) {
    product2 = context.watch<ProductProvider>().products;
    // filteredProducts = product2;

    print("filteredProducts${filteredProducts.length} ");

    return Scaffold(
      // drawer: SideBarMenu(),
      // endDrawer: MyPopupMenu(context),
      // appBar: AppBar(
      //   title: SearchBarWidget(),
      //   actions: [
      //     Builder(
      //       builder: (BuildContext context) {
      //         return IconButton(
      //           icon: const Icon(Icons.person),
      //           onPressed: () {
      //             Scaffold.of(context).openEndDrawer();
      //           },
      //         );
      //       },
      //     )
      //   ],
      // ),
      body: isLoading
          ? Center(
              child: LoadingAnimationWidget.bouncingBall(
                color: AppColors.primaryColor,
                size: 80,
              ),
            )
          : Scrollbar(
              controller: _scrollController,
              child: SingleChildScrollView(
                controller: _scrollController,
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    children: [
                      // Center(
                      //   child: Column(
                      //     children: [
                      //       Text(
                      //         selectedCategory,
                      //         style: const TextStyle(
                      //           fontSize: 20,
                      //           fontWeight: FontWeight.bold,
                      //         ),
                      //       ),
                      //     ],
                      //   ),
                      // ),
                      Container(
                        // padding: const EdgeInsets.all(8.0),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(5),
                          // border: Border.all(
                          //   color: AppColors.primaryColor,
                          //   width: 0.5,
                          // )
                        ),
                        child: Stack(children: [
                          // Positioned(
                          //   left: -13,
                          //   top: 0,
                          //   bottom: 0,
                          //   child: IconButton(
                          //     icon: Icon(Icons.arrow_back),
                          //     onPressed: () {
                          //       // scroll to the left
                          //     },
                          //   ),
                          // ),
                          // Positioned(
                          //   right: -13,
                          //   top: 0,
                          //   bottom: 0,
                          //   child: IconButton(
                          //     icon: Icon(Icons.arrow_forward),
                          //     onPressed: () {
                          //       // scroll to the right
                          //     },
                          //   ),
                          // ),
                          VsScrollbar(
                            controller: _scrollController,
                            showTrackOnHover: true,
                            isAlwaysShown: true,
                            style: const VsScrollbarStyle(
                                hoverThickness: 10.0, // default 12.0
                                radius: Radius.circular(
                                    10), // default Radius.circular(8.0)
                                thickness: 5.0, // [ default 8.0 ]
                                color: AppColors.primaryColor),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Container(
                                  height: 80.0,
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceEvenly,
                                    children: [
                                      Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          const Text(
                                            'Product Classes',
                                            style: TextStyle(
                                              color: AppColors.primaryColor,
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                          Container(
                                            height: 40.0,
                                            padding: EdgeInsets.all(10.0),
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(5),
                                              border: Border.all(
                                                color: AppColors.primaryColor,
                                                width: 0.5,
                                              ),
                                            ),
                                            child: DropdownButton<String>(
                                              icon: const Icon(
                                                  Icons.keyboard_arrow_down,
                                                  color:
                                                      AppColors.primaryColor),
                                              style: const TextStyle(
                                                  color: Colors.black,
                                                  fontSize: 16.0),
                                              underline: Container(
                                                height: 2,
                                                color: Colors.transparent,
                                              ),
                                              value: selectedProductClassId,
                                              items: [
                                                const DropdownMenuItem<String>(
                                                  value: 'All',
                                                  child: Text('All'),
                                                ),
                                                ...productClasses
                                                    .map((productClass) {
                                                  return DropdownMenuItem<
                                                      String>(
                                                    value: productClass.id,
                                                    child:
                                                        Text(productClass.name),
                                                  );
                                                }).toList(),
                                              ],
                                              onChanged: (value) async {
                                                print("valueupdate $value");

                                                setState(() {
                                                  handleProductClassChange(
                                                      value);
                                                });
                                              },
                                            ),
                                          ),
                                        ],
                                      ),
                                      Padding(
                                        padding:
                                            const EdgeInsets.only(left: 10.0),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            const Text(
                                              'Categories',
                                              style: TextStyle(
                                                color: AppColors.primaryColor,
                                                fontSize: 16,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Container(
                                              height: 40.0,
                                              padding: EdgeInsets.all(10.0),
                                              decoration: BoxDecoration(
                                                borderRadius:
                                                    BorderRadius.circular(5),
                                                border: Border.all(
                                                  color: AppColors.primaryColor,
                                                  width: 0.5,
                                                ),
                                              ),
                                              child: DropdownButton<String>(
                                                icon: const Icon(
                                                    Icons.keyboard_arrow_down,
                                                    color:
                                                        AppColors.primaryColor),
                                                style: const TextStyle(
                                                    color: Colors.black,
                                                    fontSize: 16.0),
                                                underline: Container(
                                                  height: 2,
                                                  color: Colors.transparent,
                                                ),
                                                value: selectedCategoryId,
                                                items: [
                                                  const DropdownMenuItem<
                                                      String>(
                                                    value: 'All',
                                                    child: Text('All'),
                                                  ),
                                                  if (categories != null)
                                                    ...categories
                                                        .map((category) {
                                                      return DropdownMenuItem<
                                                          String>(
                                                        value: category?.id,
                                                        child: Text(
                                                            category!.name),
                                                      );
                                                    }).toList(),
                                                ],
                                                onChanged: (String? value) {
                                                  if (value != null &&
                                                      value != "All") {
                                                    setState(() {
                                                      selectedCategoryId =
                                                          value;

                                                      // update subcategories List
                                                      // updateSubCategories(categoryId: value);
                                                      selectedCategoryName =
                                                          categories
                                                              .where(
                                                                  (element) =>
                                                                      element
                                                                          .id ==
                                                                      value)
                                                              .first
                                                              .name;

                                                      updateSubCategories(
                                                          categoryId: value);

                                                      filteredProducts =
                                                          product2
                                                              .where((product) {
                                                        return product
                                                                    .category ==
                                                                value &&
                                                            product.productClass ==
                                                                selectedProductClassId &&
                                                            product.category ==
                                                                selectedCategoryId;
                                                      }).toList();
                                                    });
                                                  } else {
                                                    setState(() {
                                                      selectedProductClassId =
                                                          selectedProductClassId;
                                                      selectedProductClassName =
                                                          selectedProductClassName;

                                                      selectedCategoryId =
                                                          'All';
                                                      selectedCategoryName =
                                                          'All';

                                                      subCategories = [];
                                                      // categories = [];

                                                      if (selectedBrandName ==
                                                          "All") {
                                                        filteredProducts =
                                                            product2.where(
                                                                (product) {
                                                          return product
                                                                  .productClass ==
                                                              selectedProductClassId;
                                                        }).toList();
                                                      } else {
                                                        filteredProducts =
                                                            product2.where(
                                                                (product) {
                                                          return product
                                                                      .productClass ==
                                                                  selectedProductClassId &&
                                                              product.brand ==
                                                                  selectedBrandId;
                                                        }).toList();
                                                      }
                                                    });
                                                  }
                                                },
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      if (subCategories.length > 0)
                                        Padding(
                                          padding:
                                              const EdgeInsets.only(left: 10.0),
                                          child: Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.start,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              const Text(
                                                'Sub Categories',
                                                style: TextStyle(
                                                  color: AppColors.primaryColor,
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                              Container(
                                                height: 40.0,
                                                padding: EdgeInsets.all(10.0),
                                                decoration: BoxDecoration(
                                                  borderRadius:
                                                      BorderRadius.circular(5),
                                                  border: Border.all(
                                                    color:
                                                        AppColors.primaryColor,
                                                    width: 0.5,
                                                  ),
                                                ),
                                                child: DropdownButton<String>(
                                                  icon: const Icon(
                                                      Icons.keyboard_arrow_down,
                                                      color: AppColors
                                                          .primaryColor),
                                                  style: const TextStyle(
                                                      color: Colors.black,
                                                      fontSize: 16.0),
                                                  underline: Container(
                                                    height: 2,
                                                    color: Colors.transparent,
                                                  ),
                                                  value: selectedSubCategoryId,
                                                  items: [
                                                    DropdownMenuItem<String>(
                                                      value: 'All',
                                                      child: Text('All'),
                                                    ),
                                                    if (subCategories != null)
                                                      ...subCategories
                                                          .map((subcategory) {
                                                        return DropdownMenuItem<
                                                            String>(
                                                          value:
                                                              subcategory?.id,
                                                          child: Text(
                                                              subcategory!
                                                                  .name),
                                                        );
                                                      }).toList(),
                                                  ],
                                                  onChanged: (String? value) {
                                                    if (value != null) {
                                                      setState(() {
                                                        selectedSubCategoryId =
                                                            value;
                                                        selectedSubCategoryName =
                                                            subCategories
                                                                .where(
                                                                    (element) =>
                                                                        element
                                                                            .id ==
                                                                        value)
                                                                .first
                                                                .name;

                                                        filteredProducts =
                                                            product2.where(
                                                                (product) {
                                                          return product
                                                                      .category ==
                                                                  selectedCategoryId &&
                                                              product.productClass ==
                                                                  selectedProductClassId &&
                                                              product.subCategory ==
                                                                  value;
                                                        }).toList();
                                                      });
                                                    }
                                                  },
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),

                                      // product brands

                                      Padding(
                                        padding:
                                            const EdgeInsets.only(left: 10.0),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            const Text(
                                              'Products Brands ',
                                              style: TextStyle(
                                                color: AppColors.primaryColor,
                                                fontSize: 16,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Container(
                                              height: 40.0,
                                              padding: EdgeInsets.all(10.0),
                                              decoration: BoxDecoration(
                                                borderRadius:
                                                    BorderRadius.circular(5),
                                                border: Border.all(
                                                  color: AppColors.primaryColor,
                                                  width: 0.5,
                                                ),
                                              ),
                                              child: DropdownButton<String>(
                                                icon: const Icon(
                                                    Icons.keyboard_arrow_down,
                                                    color:
                                                        AppColors.primaryColor),
                                                style: const TextStyle(
                                                    color: Colors.black,
                                                    fontSize: 16.0),
                                                underline: Container(
                                                  height: 2,
                                                  color: Colors.transparent,
                                                ),
                                                value: selectedBrandId,
                                                items: [
                                                  const DropdownMenuItem<
                                                      String>(
                                                    value: 'All',
                                                    child: Text('All'),
                                                  ),
                                                  if (brands != null)
                                                    ...brands.map((brand) {
                                                      return DropdownMenuItem<
                                                          String>(
                                                        value: brand?.id,
                                                        child:
                                                            Text(brand!.name),
                                                      );
                                                    }).toList(),
                                                ],
                                                onChanged: (String? value) {
                                                  if (value != null) {
                                                    setState(() {
                                                      if (value == 'All') {
                                                        selectedBrandId = value;
                                                        selectedBrandName =
                                                            'All';

                                                        filteredProducts =
                                                            product2.where(
                                                                (product) {
                                                          return product
                                                                  .productClass ==
                                                              selectedProductClassId;
                                                        }).toList();
                                                      } else {
                                                        selectedBrandId = value;

                                                        selectedBrandName = brands
                                                            .where((element) =>
                                                                element.id ==
                                                                value)
                                                            .first
                                                            .name;

                                                        filteredProducts =
                                                            product2.where(
                                                                (product) {
                                                          return product
                                                                      .productClass ==
                                                                  selectedProductClassId &&
                                                              product.brand ==
                                                                  selectedBrandId;
                                                        }).toList();
                                                      }
                                                    });
                                                  }
                                                },
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ]),
                      ),
                      product2.isNotEmpty
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
                    ],
                  ),
                ),
              ),
            ),
      // bottomNavigationBar: BottomNavigationBar(
      //   onTap: (int index) {
      //     setState(() {
      //       selectedindex = index;
      //     });
      //   },
      //   currentIndex: selectedindex,
      //   selectedItemColor: AppColors.primaryColor,
      //   unselectedItemColor: AppColors.primarytextColor,
      //   items: [
      //     BottomNavigationBarItem(
      //       icon: IconButton(
      //           onPressed: () {
      //             Navigator.pushNamed(context, '/homepage');
      //           },
      //           icon: Icon(Icons.home)),
      //       label: 'Home',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: IconButton(
      //           onPressed: () {
      //             Navigator.pushNamed(context, '/cart');
      //           },
      //           icon: Icon(Icons.shopping_cart)),
      //       label: 'Cart',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: IconButton(onPressed: () {}, icon: Icon(Icons.apps_outlined)),
      //       label: 'Shop',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.person),
      //       label: 'Profile',
      //     ),
      //   ],
      // ),
    );
  }
}
