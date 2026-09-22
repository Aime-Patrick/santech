import 'dart:convert';

import 'package:feli_express/models/subcategory.model.dart';
import 'package:http/http.dart' as http;

class SubCategoryController {
  Future<List<SubCategory>> getSubCategory() async {
    var url =
        Uri.parse("https://staging-w5ij.onrender.com/api/v1/subcategories");
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var responseBody = jsonDecode(response.body);

      if (responseBody['data'] == null) {
        throw Exception(
            'Invalid API response. "data" field is missing or null.');
      }

      var subcategoriesJson = responseBody['data']
          ['subCategories']; // Changed 'subcategories' to 'subCategories'

      if (subcategoriesJson == null) {
        // Changed 'responseBody['data']['subcategories']' to 'subcategoriesJson'
        throw Exception(
            'Invalid API response. "subCategories" field is missing or null.');
      }

      if (subcategoriesJson is! List) {
        throw Exception(
            'Invalid subcategory list. Received: $subcategoriesJson');
      }

      var subcategories = subcategoriesJson
          .map<SubCategory>((json) => SubCategory.fromJson(json))
          .toList(); // Don't forget to call toList() at the end

      return subcategories;
    } else {
      throw Exception('Failed to load subcategories');
    }
  }
}
