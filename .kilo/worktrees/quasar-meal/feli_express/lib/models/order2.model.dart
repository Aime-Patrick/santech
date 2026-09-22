import 'package:json_annotation/json_annotation.dart';

part 'order2.model.g.dart';

@JsonSerializable()
class Card {
  @JsonKey(name: 'first_6digits')
  final String first6digits;
  @JsonKey(name: 'last_4digits')
  final String last4digits;
  final String issuer;
  final String country;
  final String type;
  final String expiry;

  Card({
    required this.first6digits,
    required this.last4digits,
    required this.issuer,
    required this.country,
    required this.type,
    required this.expiry,
  });

  factory Card.fromJson(Map<String, dynamic> json) => _$CardFromJson(json);
  Map<String, dynamic> toJson() => _$CardToJson(this);
}

@JsonSerializable()
class PaymentType {
  final String type;
  final Card? card;
  final String? mobileNumber;

  PaymentType({
    required this.type,
    this.card,
    this.mobileNumber,
  });

  factory PaymentType.fromJson(Map<String, dynamic> json) =>
      _$PaymentTypeFromJson(json);
  Map<String, dynamic> toJson() => _$PaymentTypeToJson(this);
}

@JsonSerializable()
class Address {
  final String street;
  final String id;

  Address({
    required this.street,
    required this.id,
  });

  factory Address.fromJson(Map<String, dynamic> json) =>
      _$AddressFromJson(json);
  Map<String, dynamic> toJson() => _$AddressToJson(this);
}

@JsonSerializable()
class ShippingAddress {
  final String phoneNumber;
  final String country;
  final String province;
  final String district;
  final String sector;
  final String cell;
  final String village;
  final Address address;

  ShippingAddress({
    required this.phoneNumber,
    required this.country,
    required this.province,
    required this.district,
    required this.sector,
    required this.cell,
    required this.village,
    required this.address,
  });

  factory ShippingAddress.fromJson(Map<String, dynamic> json) =>
      _$ShippingAddressFromJson(json);
  Map<String, dynamic> toJson() => _$ShippingAddressToJson(this);
}

@JsonSerializable()
class Variation {
  final String? size;
  final String? color;

  Variation({
    required this.size,
    required this.color,
  });

  factory Variation.fromJson(Map<String, dynamic> json) =>
      _$VariationFromJson(json);
  Map<String, dynamic> toJson() => _$VariationToJson(this);
}

@JsonSerializable()
class ItemOrder {
  final String product;
  final String seller;
  final int quantity;
  final double price;
  final String productThumbnail;
  final String sellerPaymentStatus;
  final String id;
  final Variation? variation;

  ItemOrder({
    required this.product,
    required this.seller,
    required this.quantity,
    required this.price,
    required this.productThumbnail,
    required this.sellerPaymentStatus,
    required this.id,
    this.variation,
  });

  factory ItemOrder.fromJson(Map<String, dynamic> json) =>
      _$ItemOrderFromJson(json);
  Map<String, dynamic> toJson() => _$ItemOrderToJson(this);
}

@JsonSerializable()
class Order2 {
  @JsonKey(name: 'payment_type')
  final PaymentType paymentType;
  @JsonKey(name: 'shippingAddress')
  final ShippingAddress shippingAddress;
  final String customer;
  @JsonKey(name: 'tx_ref')
  final String txRef;
  final List<ItemOrder> items;
  final double amount;
  final String email;
  final String status;
  final String? deliveryPreference;
  final String createdAt;
  final String updatedAt;
  final String id;

  Order2({
    required this.paymentType,
    required this.shippingAddress,
    required this.customer,
    required this.txRef,
    required this.items,
    required this.amount,
    required this.email,
    required this.status,
    this.deliveryPreference,
    required this.createdAt,
    required this.updatedAt,
    required this.id,
  });

  factory Order2.fromJson(Map<String, dynamic> json) => _$Order2FromJson(json);
  Map<String, dynamic> toJson() => _$Order2ToJson(this);
}
