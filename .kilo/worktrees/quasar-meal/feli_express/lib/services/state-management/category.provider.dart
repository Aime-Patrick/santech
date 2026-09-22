import 'package:feli_express/functions/Apis/category.api.dart';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/category.model.dart';

class ProductCategoryProvider with ChangeNotifier {
  final List<Category> _productscategories = [];
  final CategoryController _ProductCategoryController = CategoryController();

  List<Category> get productscategories => _productscategories;

  void addProductCategory(Category productcategory) {
    final int index =
        _productscategories.indexWhere((p) => p.id == productcategory.id);
    if (index != -1) {
      // If the productclass exists, remove it
      _productscategories.removeAt(index);
    }
    // Add the new product
    _productscategories.add(productcategory);
    notifyListeners();
  }
}
