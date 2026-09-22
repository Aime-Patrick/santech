import 'package:another_flushbar/flushbar.dart';
import 'package:feli_express/functions/Apis/payment.api.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/services/storage/local-storage.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/elevatedbutton.dart';
import 'package:feli_express/widgets/textformfield.dart';
import 'package:flutter/material.dart';
import 'package:intl_phone_field/intl_phone_field.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

class MobileMoneyPage extends StatefulWidget {
  final country;
  final district;
  final province;
  final sector;
  final cell;
  final village;
  final phone;
  final deliverypreference;
  final street;

  const MobileMoneyPage(
      this.country,
      this.province,
      this.district,
      this.sector,
      this.cell,
      this.village,
      this.phone,
      this.deliverypreference,
      this.street);

  @override
  _MobileMoneyPage createState() => _MobileMoneyPage();
}

class _MobileMoneyPage extends State<MobileMoneyPage> {
  bool _isLoading = false;
  final TextEditingController emailController = TextEditingController();
  final TextEditingController fullnameController = TextEditingController();
  var selectedIndex = 0;
  final TextEditingController phoneController = TextEditingController();

  late String token;
  LocalStorageService localStorageService = LocalStorageService();

  @override
  void initState() {
    super.initState();
    _getFormData();
    localStorageService.getToken().then((value) {
      setState(() {
        token = value ?? '';
      });
    });
  }

  var ispaying = false;

  void setLoading(bool loading) {
    setState(() {
      _isLoading = loading;
    });
  }

  final _formKey = GlobalKey<FormState>();
  final phoneField = IntlPhoneField();

  void clearCart(BuildContext context) {
    context.read<CartProvider>().removeAll();
  }

  Future<void> _saveFormData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('phone', phoneController.text);
    prefs.setString('email', emailController.text);
    prefs.setString('fullname', fullnameController.text);
  }

  Future<void> _getFormData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    phoneController.text = prefs.getString('phone') ?? '';
    emailController.text = prefs.getString('email') ?? '';
    fullnameController.text = prefs.getString('fullname') ?? '';
  }

  @override
  Widget build(BuildContext context) {
    var cartData = context.watch<CartProvider>();
    double totalPrice = cartData.totalPrice as double;

    // Map the cart items to a list of maps with the required fields
    List<Map<String, dynamic>> cartItemsMapped = cartData.cartItems.map((item) {
      // Create the variation map dynamically
      Map<String, String> variation = {};
      if (item.color != null) {
        variation["color"] = item.color as String;
      }
      if (item.size != null) {
        variation["size"] = item.size as String;
      }

      // Construct the main map
      Map<String, dynamic> cartItem = {
        "product": item.id,
        "quantity": item.quantity,
        "price": item.price,
        "productThumbnail": item.image,
        "seller": item.seller,
      };

      // Add the variation map only if it is not empty
      if (variation.isNotEmpty) {
        cartItem["variation"] = variation;
      }

      return cartItem;
    }).toList();

    Map<String, String> address = {
      "street": widget.street,
    };

    // Prepare the shipping address map
    Map<String, dynamic> shippingAddress = {
      "country": widget.country,
      "province": widget.province,
      "district": widget.district,
      "sector": widget.sector,
      "cell": widget.cell,
      "village": widget.village,
      "city": widget.district,
      "phoneNumber": "0" + widget.phone,
      "address": address,
      // "address": address.toString(),
    };

    return Scaffold(
      appBar: AppBar(
        title: Text('Payment Method'),
        backgroundColor: AppColors.AppColor,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                height: 80,
                width: 180,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.primarytextColor.withOpacity(0.1),
                        spreadRadius: 3,
                        blurRadius: 5,
                        offset: const Offset(0, 3),
                      ),
                    ],
                    image: const DecorationImage(
                      image: AssetImage(
                        'assets/images/mtnpay.jpeg',
                      ),
                      fit: BoxFit.cover,
                    )),
              ),
              SizedBox(height: 50),
              Container(
                padding: const EdgeInsets.all(45),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                  color: AppColors.AppColor,
                  border: const Border(
                    top: BorderSide(
                      color: AppColors.secondaryColor,
                      width: 2,
                    ),
                    bottom: BorderSide(
                      color: AppColors.secondaryColor,
                      width: 2,
                    ),
                    left: BorderSide(
                      color: AppColors.secondaryColor,
                      width: 2,
                    ),
                    right: BorderSide(
                      color: AppColors.secondaryColor,
                      width: 2,
                    ),
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.primarytextColor.withOpacity(0.1),
                      spreadRadius: 3,
                      blurRadius: 5,
                      offset: const Offset(0, 3),
                    ),
                  ],
                ),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text('Phone Number'),
                      Container(
                        height: 60,
                        child: IntlPhoneField(
                          controller: phoneController,
                          decoration: const InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(10)),
                            ),
                            contentPadding: EdgeInsets.all(5),
                          ),
                          initialCountryCode: 'RW',
                          onChanged: (phone) {
                            print(phone.completeNumber);
                          },
                        ),
                      ),
                      Text('Full Name'),
                      MyTextFormField(context, TextInputAction.next, '',
                          TextInputType.text, false, (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter a full name';
                        } else if (value.length < 5) {
                          return 'Village must be at least 5 characters';
                        }
                        return null;
                      }, fullnameController, ''),
                      SizedBox(height: 10),
                      Text('Email'),
                      MyTextFormField(context, TextInputAction.next, '',
                          TextInputType.emailAddress, false, (value) {
                        if (value == null || value.isEmpty) {
                          return "Please enter an email address";
                        } else if (!value.contains('@')) {
                          return 'Please enter a valid email address';
                        }
                        return null;
                      }, emailController, ''),
                      SizedBox(height: 10),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: 10, horizontal: 15),
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
                      MyElevatedButton(
                        context,
                        50.0,
                        'Pay $totalPrice RWF',
                        () async {
                          // Handle the payment process
                          await _saveFormData();
                          if (_formKey.currentState!.validate() &&
                              phoneController.text.isNotEmpty &&
                              emailController.text.isNotEmpty &&
                              fullnameController.text.isNotEmpty) {
                            // Do something

                            // Create the request data map
                            Map<String, dynamic> requestData = {
                              "shippingAddress": shippingAddress,
                              "deliveryPreference":
                                  widget.deliverypreference.toLowerCase(),
                              "items": cartItemsMapped,
                              "amount": totalPrice,
                              "phoneNumber": "0" + phoneController.text,
                              "email": emailController.text,
                              "fullname": fullnameController.text,
                              // Add other fields as necessary
                            };

                            print("payclicked");
                            setState(() {
                              ispaying = true;
                            });
                            await payWithMomo(requestData, token, context)
                                .then((response) {
                              setState(() {
                                ispaying = false;
                              });

                              print(
                                  "Payment response: ${response['redirect']}");
                              var url = response['redirect'];

                              if (url != null) {
                                _launchURL(url).then((value) {
                                  print("URL launched successfully");
                                  clearCart(context);
                                  Navigator.popAndPushNamed(
                                    context,
                                    '/homepage',
                                  );
                                }).catchError((error) {
                                  print("Error launching URL: $error");
                                });
                              }

                              Flushbar(
                                message: 'Payment in progress...',
                                duration: const Duration(seconds: 3),
                                backgroundColor: AppColors.primaryColor,
                                flushbarPosition: FlushbarPosition.TOP,
                                margin: const EdgeInsets.all(8),
                                padding: const EdgeInsets.all(10),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(8)),
                                maxWidth: 200,
                              ).show(context);
                            }).catchError((error) {
                              setState(() {
                                ispaying = false;
                              });
                              print("Payment error: $error");
                            });
                          } else {
                            Flushbar(
                              message: 'Please fill in all the required fields',
                              duration: const Duration(seconds: 3),
                              backgroundColor: AppColors.primaryColor,
                              flushbarPosition: FlushbarPosition.TOP,
                              margin: const EdgeInsets.all(8),
                              padding: const EdgeInsets.all(10),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(8)),
                              maxWidth: 200,
                            ).show(context);
                          }
                        },
                        ispaying,
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
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

Future _launchURL(String url) async {
  final String encodedUrl = Uri.encodeFull(url);
  try {
    if (await canLaunch(encodedUrl)) {
      await launch(encodedUrl);
    } else {
      print('Could not launch $encodedUrl');
    }
  } catch (e) {
    print('Error launching URL: $e');
  }
}
