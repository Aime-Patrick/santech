// import 'package:feli_express/functions/Apis/orders.api.dart';
// import 'package:feli_express/models/order2.model.dart';
// import 'package:flutter/foundation.dart';
// import 'package:feli_express/models/product.model.dart';
// import 'package:feli_express/functions/Apis/product.api.dart';

// class OrderProvider with ChangeNotifier {
//   final List<Order2> _orders = [];
//   final OrderController _orderController = OrderController();

//   List<Order2> get orders => _orders;

//   void addProduct(Order2 order) {
//     // Check if the order already exists in the list
//     final int index = _orders.indexWhere((p) => p.id == order.id);
//     if (index != -1) {
//       // If the order exists, remove it
//       _orders.removeAt(index);
//     }

//     print("orders on orderscreen  add ${order}");
//     // Add the new order
//     _orders.add(order);
//     notifyListeners();
//   }

//   Future<void> fetchAndAddOrders(String token) async {
//     List<Order2> fetchedorders = await _orderController.getOrders(token);
//     print("orders on orderscreen  fetch ${fetchedorders}");
//     for (var order in fetchedorders) {
//       addProduct(order);
//     }
//     notifyListeners();
//   }
// }

import 'package:feli_express/functions/Apis/orders.api.dart';
import 'package:flutter/foundation.dart';
import 'package:feli_express/models/order2.model.dart';

class OrderProvider with ChangeNotifier {
  final List<Order2> _orders = [];
  final OrderController _orderController = OrderController();

  List<Order2> get orders => _orders;

  void addOrder(Order2 order) {
    final int index = _orders.indexWhere((o) => o.id == order.id);
    if (index != -1) {
      _orders[index] = order;
    } else {
      _orders.add(order);
    }
    notifyListeners();
  }

  Future<void> fetchAndAddOrders(String token) async {
    try {
      final fetchedOrders = await _orderController.getOrders(token);
      _orders.clear();
      _orders.addAll(fetchedOrders);
      notifyListeners();
    } catch (error) {
      throw Exception('Failed to fetch orders: $error');
    }
  }
}
