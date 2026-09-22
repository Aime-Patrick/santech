import 'package:feli_express/functions/Apis/productclass.api.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:flutter/foundation.dart';

import 'package:feli_express/functions/Apis/product.api.dart';
import 'package:feli_express/models/productclass.model.dart';

class ProductClassProvider with ChangeNotifier {
  final List<ProductClass> _productsclass = [];
  final ProductClassController _ProductClassController =
      ProductClassController();

  List<ProductClass> get productsclass => _productsclass;

  void addProductclass(ProductClass productclass) {
    print("addding product ${productclass}");
    // Check if the product already exists in the list
    final int index = _productsclass.indexWhere((p) => p.id == productclass.id);
    if (index != -1) {
      // If the productclass exists, remove it
      _productsclass.removeAt(index);
    }
    // Add the new product
    _productsclass.add(productclass);
    notifyListeners();
  }
}
