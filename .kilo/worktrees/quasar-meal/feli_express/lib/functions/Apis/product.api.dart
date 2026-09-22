import 'dart:convert';

import 'package:feli_express/models/product.model.dart';
import 'package:http/http.dart' as http;

class ProductController {
  Future<List<Product>> getProduct() async {
    var url = Uri.parse("https://staging-w5ij.onrender.com/api/v1/products");
    var response = await http.get(url);

    if (response.statusCode == 200) {
      try {
        var responseBody = jsonDecode(response.body);

        // Extract the products list from the response
        var productsJson = responseBody['data']['products'];

        // Check if the products list is null or not a List
        if (productsJson is! List) {
          throw Exception('Invalid products list');
        }

        // Convert each product JSON to a Product object using Product.fromJson
        var products = productsJson
            .map<Product>((json) => Product.fromJson(json))
            .toList();

        return products;
      } catch (e) {
        print("error  while getting product $e");
        throw Exception('Failed to load products');
      }
    } else {
      print("response ${response.body}");
      throw Exception('Failed to load products');
    }
  }
}
