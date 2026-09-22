// import 'dart:convert';
// import 'package:feli_express/models/order2.model.dart';
// import 'package:http/http.dart' as http;

// class OrderController {
//   Future<dynamic> getOrders(String token) async {
//     try {
//       final url = Uri.parse('

//       // var url = Uri.parse('http://10.0.2.2:5000/api/v1/orders');
//       final response = await http.get(url, headers: <String, String>{
//         'Authorization': 'Bearer $token',
//         'Content-Type': 'application/json',
//       });

//       final responseData = jsonDecode(response.body);

//       print("orders respons2 ${responseData['data']['orders']}   ");
//       if (response.statusCode == 200) {
//         var orderjson = responseData['data']['orders'];

//         if (orderjson is! List) {
//           throw Exception('Invalid orders list');
//         }

//         // var orders =
//         //     orderjson.map<Order2>((json) => Order2.fromJson(json)).toList();

//         var orders = orderjson
//             .where((json) => json is Map<String, dynamic>)
//             .map<Order2>(
//                 (json) => Order2.fromJson(json as Map<String, dynamic>))
//             .toList();

//         print("orders respons2 ${orders}   ");

//         return orders;
//       } else {
//         throw Exception('Failed to load orders');
//       }
//     } catch (e) {
//       throw Exception('Failed to load orders error ${e} ');
//     }
//   }
// }

import 'dart:convert';

import 'package:feli_express/models/order2.model.dart';
import 'package:http/http.dart' as http;

class OrderController {
  Future<List<Order2>> getOrders(String token) async {
    final url = Uri.parse('https://staging-w5ij.onrender.com/api/v1/orders');
    final response = await http.get(url, headers: <String, String>{
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json',
    });

    print("orders respons2 ${response.body}   ");

    if (response.statusCode == 200) {
      final responseData = jsonDecode(response.body);
      final ordersJson = responseData['data']['orders'] as List<dynamic>;

      if (ordersJson is! List) {
        throw Exception('Invalid orders list');
      }
      return ordersJson
          .where((json) => json is Map<String, dynamic>)
          .map<Order2>((json) => Order2.fromJson(json as Map<String, dynamic>))
          .toList();
    } else {
      throw Exception('Failed to load orders ${response.body}');
    }
  }
}
