import 'package:json_annotation/json_annotation.dart';

part 'order.model.g.dart';

@JsonSerializable()
class Order {
  final String id;
  final String customerId;
  final List<OrderItem> items;
  final DateTime orderDate;
  final String status;
  final double totalAmount;
  final String paymentMethod;
  final String shippingAddress;
  final DateTime? estimatedDeliveryDate;

  Order({
    required this.id,
    required this.customerId,
    required this.items,
    required this.orderDate,
    required this.status,
    required this.totalAmount,
    required this.paymentMethod,
    required this.shippingAddress,
    this.estimatedDeliveryDate,
  });

  factory Order.fromJson(Map<String, dynamic> json) => _$OrderFromJson(json);
  Map<String, dynamic> toJson() => _$OrderToJson(this);
}

@JsonSerializable()
class OrderItem {
  final String productId;
  final int quantity;
  final double price;

  OrderItem({
    required this.productId,
    required this.quantity,
    required this.price,
  });
  int get length => quantity;

  factory OrderItem.fromJson(Map<String, dynamic> json) => _$OrderItemFromJson(json);
  Map<String, dynamic> toJson() => _$OrderItemToJson(this);
}