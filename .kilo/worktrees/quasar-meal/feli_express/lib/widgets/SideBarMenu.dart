import 'package:feli_express/functions/Apis/productclass.api.dart';
import 'package:feli_express/models/productclass.model.dart' as pc;
import 'package:feli_express/models/subcategory.model.dart';
import 'package:feli_express/pages/productpage.dart';
import 'package:feli_express/services/state-management/category.provider.dart';
import 'package:feli_express/services/state-management/product-class.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:provider/provider.dart';

import '../models/category.model.dart';

class SideBarMenu extends StatefulWidget {
  final String selectedProductClassId;
  final String selectedProductClassName;
  final String selectedCategoryId;
  final String selectedCategoryName;
  final String selectedSubCategoryId;
  final String selectedSubCategoryName;
  final String selectedBrandName;
  final String selectedBrandId;
  final Function(
    String selectedProductClassId,
    String selectedProductClassName,
    String selectedCategoryId,
    String selectedCategoryName,
    String selectedSubCategoryId,
    String selectedSubCategoryName,
    String selectedBrandId,
    String selectedBrandName,
  ) onSelectionChanged;

  const SideBarMenu({
    Key? key,
    required this.selectedProductClassId,
    required this.selectedProductClassName,
    required this.selectedCategoryId,
    required this.selectedCategoryName,
    required this.selectedSubCategoryId,
    required this.selectedSubCategoryName,
    required this.selectedBrandId,
    required this.selectedBrandName,
    required this.onSelectionChanged,
  }) : super(key: key);
  @override
  _SideBarMenuState createState() => _SideBarMenuState();
}

class _SideBarMenuState extends State<SideBarMenu> {
  int _selectedProductClassIndex = 0;
  List<pc.Category?> _selectedCategories = [];
  List<Category> category_provider = [];
  late List<SubCategory> subCategories = [];
  Map<String, List<SubCategory>> subCategoriesMap = {};
  void _onItemSelected(
    String selectedProductClassId,
    String selectedProductClassName,
    String selectedCategoryId,
    String selectedCategoryName,
    String selectedSubCategoryId,
    String selectedSubCategoryName,
    String selectedBrandId,
    String selectedBrandName,
  ) {
    if (widget.onSelectionChanged != null) {
      widget.onSelectionChanged(
        selectedProductClassId,
        selectedProductClassName,
        selectedCategoryId,
        selectedCategoryName,
        selectedSubCategoryId,
        selectedSubCategoryName,
        selectedBrandId,
        selectedBrandName,
      );
    }
  }

  @override
  void initState() {
    super.initState();
    category_provider =
        context.read<ProductCategoryProvider>().productscategories;
    for (var category in category_provider) {
      subCategoriesMap[category.id] = category.subCategories ?? [];
    }
  }

  @override
  Widget build(BuildContext context) {
    final productClassController = ProductClassController();
    final productclasses = context.watch<ProductClassProvider>().productsclass;

    void updateSubCategories({String? categoryId}) {
      setState(() {
        subCategories = category_provider
            .firstWhere((category) => category.id == categoryId)
            .subCategories!;
      });
    }

    return FutureBuilder<List<pc.ProductClass>>(
      future: productclasses.isEmpty
          ? productClassController.getProductClass()
          : Future.value(productclasses),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(
            child: LoadingAnimationWidget.prograssiveDots(
              color: AppColors.primaryColor,
              size: 50.0,
            ),
          );
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return const Center(child: Text('No product classes found'));
        } else {
          final productClasses = snapshot.data!;
          return Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                topRight: Radius.circular(20),
                bottomRight: Radius.circular(20),
              ),
            ),
            margin: const EdgeInsets.fromLTRB(0.0, 20.0, 100.0, 0.0),
            padding: const EdgeInsets.only(left: 5.0),
            child: Column(
              children: [
                const Padding(
                  padding: EdgeInsets.only(top: 30.0),
                  child: Text(
                    "Product Classes",
                    style: TextStyle(
                      color: AppColors.primaryColor,
                      fontSize: 20,
                      // fontWeight: FontWeight.,
                    ),
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: productClasses.length,
                    itemBuilder: (context, index) {
                      final productClass = productClasses[index];
                      return ExpansionTile(
                        title: GestureDetector(
                          onTap: () {
                            // Save the name and id of the clicked item here

                            //  update the selected product class index
                            _onItemSelected(
                              productClass.id,
                              productClass.name,
                              "All",
                              "All",
                              "All",
                              "All",
                              "All",
                              "All",
                            );
                          },
                          child: Text(
                            productClass.name[0].toUpperCase() +
                                productClass.name.substring(1),
                            style: TextStyle(
                              color: AppColors.primaryColor,
                              fontSize: 14,
                              // fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),

                        //  Text(
                        //   productClass.name[0].toUpperCase() +
                        //       productClass.name.substring(1),
                        //   style: TextStyle(
                        //     color: AppColors.primaryColor,
                        //     fontSize: 18,
                        //     fontWeight: FontWeight.bold,
                        //   ),
                        // ),
                        children: <Widget>[
                          const Padding(
                            padding: EdgeInsets.all(8.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: EdgeInsets.only(left: 13.0),
                                  child: Text(
                                    "Categories",
                                    style: TextStyle(
                                      color: AppColors.primaryColor,
                                      fontSize: 16,
                                      // fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          ...productClass.categories!.map((category) {
                            return Padding(
                                padding: const EdgeInsets.only(left: 8.0),
                                child: ExpansionTile(
                                    title: GestureDetector(
                                        onTap: () {
                                          setState(() {
                                            print(
                                                "category id: ${category.id}");
                                            updateSubCategories(
                                                categoryId: category.id);
                                          });

                                          _onItemSelected(
                                            productClass.id,
                                            productClass.name,
                                            category.id,
                                            category.name,
                                            "All",
                                            "All",
                                            "All",
                                            "All",
                                          );
                                        },
                                        child: Text(category.name)),
                                    children: [
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
                                        children: [
                                          Padding(
                                            padding:
                                                EdgeInsets.only(left: 18.0),
                                            child: Text(
                                              "SubCategories",
                                              style: TextStyle(
                                                color: AppColors.primaryColor,
                                                fontSize: 16,
                                                // fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                      if (subCategoriesMap[category.id] != null)
                                        ...subCategoriesMap[category.id]!
                                            .map((subCategory) => ListTile(
                                                  title: GestureDetector(
                                                    onTap: () {
                                                      setState(() {});
                                                      _onItemSelected(
                                                        productClass.id,
                                                        productClass.name,
                                                        category.id,
                                                        category.name,
                                                        subCategory.id,
                                                        subCategory.name,
                                                        "All",
                                                        "All",
                                                      );
                                                    },
                                                    child: Padding(
                                                      padding: EdgeInsets.only(
                                                          left: 3.0),
                                                      child: Text(
                                                          subCategory.name),
                                                    ),
                                                  ),
                                                ))
                                            .toList(),
                                    ]));
                          }).toList(),
                          const Padding(
                            padding: EdgeInsets.only(left: 13.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: EdgeInsets.only(left: 10.0),
                                  child: Text(
                                    "Product Brands",
                                    style: TextStyle(
                                      color: AppColors.primaryColor,
                                      fontSize: 16,
                                      // fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          ...productClass.brands!.map((brand) {
                            return Padding(
                              padding: const EdgeInsets.only(left: 10.0),
                              child: ListTile(
                                title: GestureDetector(
                                    onTap: () {
                                      setState(() {});
                                      _onItemSelected(
                                        productClass.id,
                                        productClass.name,
                                        "All",
                                        "All",
                                        "All",
                                        "All",
                                        brand.id,
                                        brand.name,
                                      );
                                    },
                                    child: Text(brand.name)),
                              ),
                            );
                          }).toList(),
                        ],
                      );
                    },
                  ),
                ),
              ],
            ),
          );
        }
      },
    );
  }
}
