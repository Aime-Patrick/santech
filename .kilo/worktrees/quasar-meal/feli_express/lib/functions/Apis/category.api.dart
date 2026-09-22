import 'dart:convert';

import 'package:feli_express/models/category.model.dart';
import 'package:http/http.dart' as http;

class CategoryController {
  Future<List<Category>> getCategory() async {
    var url = Uri.parse("https://staging-w5ij.onrender.com/api/v1/categories");
    var response = await http.get(url);
    print("categoriesJson: response ${response.statusCode}");

    if (response.statusCode == 200) {
      var responseBody = jsonDecode(response.body);
      var categoriesJson = responseBody['data']['categories'];
      print("categoriesJson: $categoriesJson");

      if (categoriesJson is! List) {
        throw Exception('Invalid category list');
      }

      // return categories;
      return categoriesJson
          .map<Category>((json) => Category.fromJson(json))
          .toList();
    } else {
      throw Exception('Failed to load categories');
    }
  }
}
