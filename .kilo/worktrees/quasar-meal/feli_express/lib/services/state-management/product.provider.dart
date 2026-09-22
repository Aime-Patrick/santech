import 'package:flutter/foundation.dart';
import 'package:feli_express/models/product.model.dart';
import 'package:feli_express/functions/Apis/product.api.dart';

// class ProductProvider with ChangeNotifier {
//   final List<Product> _products = [];
//   final ProductController _productController = ProductController();

//   List<Product> get products => _products;

//   void addProduct(Product product) {
//     _products.add(product);
//     notifyListeners();
//   }

//   Future<void> fetchAndAddProducts() async {
//     List<Product> fetchedProducts = await _productController.getProduct();
//     _products.addAll(fetchedProducts);
//     notifyListeners();
//   }
// }

class ProductProvider with ChangeNotifier {
  final List<Product> _products = [];
  final ProductController _productController = ProductController();

  List<Product> get products => _products;

  void addProduct(Product product) {
    // Check if the product already exists in the list
    final int index = _products.indexWhere((p) => p.id == product.id);
    if (index != -1) {
      // If the product exists, remove it
      _products.removeAt(index);
    }
    // Add the new product
    _products.add(product);
    notifyListeners();
  }

  Future<Iterable<Product>> getProduct(String id) {
    var product = _products.where((p) => p.id == id);

    return Future.value(product);
  }

  Future<void> fetchAndAddProducts() async {
    List<Product> fetchedProducts = await _productController.getProduct();
    for (var product in fetchedProducts) {
      addProduct(product);
    }
    notifyListeners();
  }
}
