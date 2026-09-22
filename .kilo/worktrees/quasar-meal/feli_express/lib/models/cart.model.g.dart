// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cart.model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CartItem _$CartItemFromJson(Map<String, dynamic> json) => CartItem(
      id: json['id'] as String,
      name: json['name'] as String,
      price: json['price'],
      image: json['image'] as String,
      color: json['color'] as String?,
      size: json['size'] as String?,
      quantity: (json['quantity'] as num?)?.toInt() ?? 1,
      seller: json['seller'] as String,
      stockQuantity: (json['stockQuantity'] as num).toInt(),
      discountPercentage: (json['discountPercentage'] as num?)?.toInt() ?? 0,
    );

Map<String, dynamic> _$CartItemToJson(CartItem instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'price': instance.price,
      'image': instance.image,
      'seller': instance.seller,
      'discountPercentage': instance.discountPercentage,
      'quantity': instance.quantity,
      'stockQuantity': instance.stockQuantity,
      'color': instance.color,
      'size': instance.size,
    };
