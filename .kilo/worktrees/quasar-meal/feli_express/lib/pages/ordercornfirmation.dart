import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Order Confirmation'),
        ),
        body: Center(
          child: OrderConfirmation(),
        ),
      ),
    );
  }
}

class OrderConfirmation extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.textcolor,
              borderRadius: BorderRadius.circular(8),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 2,
                  blurRadius: 5,
                  offset: Offset(0, 3),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: Icon(Icons.add_circle, color: AppColors.primaryColor, size: 40),
                      onPressed: () {
                        // Navigate to the shipping address page
                       // Navigator.pushNamed(context, '/shipping_address');
                      },
                    ),
                    SizedBox(width: 8),
                    const Text(
                      'Add a shipping address',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                Divider(color: AppColors.secondaryColor),
                Row(
                  children: [
                    Image.network(
                      'https://www.at-home.co.in/cdn/shop/products/SCHOLAR-STUDY-DESK-WALNUT_FLSDSCHOLARSDWLT_02.jpg?v=1656487315', // Replace with your image URL
                      width: 70,
                      height: 70,
                    ),
                    SizedBox(width: 16),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Single Couch',
                            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                          SizedBox(height: 4),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Color: Brown',
                                style: TextStyle(fontSize: 12, color: AppColors.secondaryColor),
                              ),
                              Text(
                                'Amount: RWF 50,000',
                                style: TextStyle(fontSize: 12, color: AppColors.secondaryColor),
                              ),
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              //SizedBox(height: 16),
                              Text(
                                'Total commodity price:',
                                style: TextStyle(fontSize: 12, color: AppColors.secondaryColor),
                              ),
                              Text(
                                ' +50,000',
                                style: TextStyle(fontSize: 12, color: AppColors.secondaryColor),
                              ),
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Total',
                                style: TextStyle(fontSize: 15, color: AppColors.primarytextColor,fontWeight: FontWeight.bold),
                              ),
                              Text(
                                '+50,000',
                                style: TextStyle(fontSize: 16, color: AppColors.primarytextColor,fontWeight: FontWeight.bold),
                              ),
                            ],
                          )
                        ],
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 16),
                Center(
                  child: TextButton(
                    onPressed: () {
                      // Confirm order action
                    },
                    style: TextButton.styleFrom(
                      foregroundColor: AppColors.primaryColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      )
                    ),
                    child: Text(
                      'Confirm Order',
                      style: TextStyle(color: AppColors.primaryColor, fontSize: 16),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
