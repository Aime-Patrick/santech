import 'package:json_annotation/json_annotation.dart';

part 'cart.model.g.dart';

@JsonSerializable()
class CartItem {
  final String id;
  final String name;
  final dynamic price;
  final String image;
  final String seller;
  final int discountPercentage;

  int quantity;
  final int stockQuantity;

  // color variation
  final String? color;
  final String? size;

  CartItem({
    required this.id,
    required this.name,
    required this.price,
    required this.image,
    this.color,
    this.size,
    this.quantity = 1,
    required this.seller,
    required this.stockQuantity,
    this.discountPercentage = 0,
  });

  double get priceAsDouble => (price is num) ? (price as num).toDouble() : 0.0;

  double get discountedPrice {
    return priceAsDouble * (1 - discountPercentage / 100);
  }

  factory CartItem.fromJson(Map<String, dynamic> json) =>
      _$CartItemFromJson(json);
  Map<String, dynamic> toJson() => _$CartItemToJson(this);
}
