import 'dart:convert';

import 'package:feli_express/models/productclass.model.dart';
import 'package:http/http.dart' as http;

class ProductClassController {
  Future<List<ProductClass>> getProductClass() async {
    var url =
        Uri.parse("https://staging-w5ij.onrender.com/api/v1/product-classes");
    var response = await http.get(url);

    if (response.statusCode == 200 || response.statusCode == 201) {
      var responseBody = jsonDecode(response.body);
      var productClassJson = responseBody['data']['productClasses'];

      if (productClassJson is! List) {
        throw Exception('Invalid product class list');
      }

      var productClasses = productClassJson
          .map<ProductClass>((json) => ProductClass.fromJson(json))
          .toList();

      return productClasses;
    } else {
      print('Request failed with status: ${response.statusCode}.');
      print('Response body: ${response.body}');
      throw Exception('Failed to load product classes');
    }
  }
}
