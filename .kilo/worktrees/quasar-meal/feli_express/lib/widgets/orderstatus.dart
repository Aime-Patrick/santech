import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';

class OrderStatusLabel extends StatelessWidget {
  final String status;

  OrderStatusLabel({required this.status});

  var statusColors = {
    "awaits payment": "#FAD02E",
    "pending": "#F0690E",
    "processing": "#2E8B57",
    "shipped": "#008080",
    "delivered": "#006400",
    "cancelled": "#FF0000",
    "transaction failed": "#8B0000",
  };

  String getStatusColor(String status) {
    return statusColors[status.toLowerCase()] ?? "#000000";
  }

  @override
  Widget build(BuildContext context) {
    Color backgroundColor;

    backgroundColor =
        Color(int.parse(getStatusColor(status).replaceAll("#", "0xFF")));

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 2.0),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(5.0),
      ),
      child: Text(
        status,
        style: TextStyle(
          color: AppColors.AppColor,
        ),
      ),
    );
  }
}
