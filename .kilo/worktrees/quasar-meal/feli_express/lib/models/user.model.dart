import 'package:json_annotation/json_annotation.dart';

// -- generate map data automaticaly
part 'user.model.g.dart';

@JsonSerializable()
class User {
  String email;
  String? firstName;
  String? lastName;

  String role;
  String password;
  String? confirmPassword;

  User({
    required this.email,
    this.firstName,
    this.lastName,
    this.role = "customer",
    required this.password,
    this.confirmPassword,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
