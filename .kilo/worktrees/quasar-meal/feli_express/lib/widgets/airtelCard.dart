import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/elevatedbutton.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class MyairtelCard extends StatefulWidget {
  @override
  _MyairtelCardState createState() => _MyairtelCardState();
}

class _MyairtelCardState extends State<MyairtelCard> {
  bool _isLoading = false;

  void setLoading(bool loading) {
    setState(() {
      _isLoading = loading;
    });
  }

  @override
  Widget build(BuildContext context) {
    var cartData = context.watch<CartProvider>();
    double totalPrice = cartData.totalPrice as double;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(5),
        color: AppColors.AppColor,
        boxShadow: [
          BoxShadow(
            color: AppColors.primarytextColor.withOpacity(0.1),
            spreadRadius: 3,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
            decoration: BoxDecoration(
              color: AppColors.secondaryColor,
              borderRadius: BorderRadius.circular(5),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Reference No: ',
                  style: TextStyle(
                    color: AppColors.primarytextColor,
                    fontSize: 14,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'Total: $totalPrice RWF',
                  style: const TextStyle(
                    color: AppColors.primarytextColor,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 20),
          const Text(
            'Enter your Airtel mobile money number',
            style: TextStyle(
              color: AppColors.primarytextColor,
              fontSize: 14,
            ),
          ),
          SizedBox(height: 10),
          Container(
            child: TextFormField(
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your Airtel mobile money number';
                } else if (value.length < 10) {
                  return 'Airtel mobile money number must be at least 10 characters';
                }

                return null;
              },
              decoration: InputDecoration(
                hintText: 'Example: 073*****564',
                hintStyle: const TextStyle(
                  color: AppColors.secondaryColor,
                  fontSize: 14,
                ),
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(5),
                  borderSide: const BorderSide(
                    color: AppColors.secondaryColor,
                  ),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(5),
                  borderSide: BorderSide(
                    color: AppColors.primaryColor,
                  ),
                ),
                contentPadding: EdgeInsets.symmetric(horizontal: 10),
              ),
              keyboardType: TextInputType.phone,
            ),
          ),
          SizedBox(height: 20),
          MyElevatedButton(
            context,
            50.0,
            'Pay $totalPrice RWF',
            () {
              // Handle the payment process
            },
            false,
            setLoading,
          ),
          SizedBox(height: 20),
          Text(
            'Make sure that the account balance is greater than $totalPrice RWF, otherwise the payment will not be completed',
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: AppColors.primarytextColor,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}
