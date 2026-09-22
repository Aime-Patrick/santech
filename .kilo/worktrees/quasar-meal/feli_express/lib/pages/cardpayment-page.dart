import 'package:another_flushbar/flushbar.dart';
import 'package:feli_express/functions/Apis/payment.api.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/services/storage/local-storage.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/elevatedbutton.dart';
import 'package:feli_express/widgets/textformfield.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

class CardPaymentPage extends StatefulWidget {
  final country;
  final district;
  final province;
  final sector;
  final cell;
  final village;
  final phone;
  final deliverypreference;
  final street;

  CardPaymentPage(
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
  _CardPaymentPage createState() => _CardPaymentPage();
}

class _CardPaymentPage extends State<CardPaymentPage> {
  bool _isLoading = false;
  final TextEditingController email = TextEditingController();
  final TextEditingController cardnumber = TextEditingController();
  final TextEditingController cardholder = TextEditingController();
  final TextEditingController cvv = TextEditingController();
  final TextEditingController expirydate = TextEditingController();
  final TextEditingController amount = TextEditingController();
  // final TextEditingController email = TextEditingController();
  final TextEditingController phone = TextEditingController();
  final TextEditingController fullname = TextEditingController();
  final TextEditingController currency = TextEditingController();

  final TextEditingController pin = TextEditingController();
  final TextEditingController otp = TextEditingController();
  final TextEditingController city = TextEditingController();
  final TextEditingController country = TextEditingController();
  final TextEditingController addres = TextEditingController();
  final TextEditingController postalcode = TextEditingController();
  final TextEditingController state = TextEditingController();
  var selectedIndex = 0;
  final _formKey = GlobalKey<FormState>();

  late String token;
  LocalStorageService localStorageService = LocalStorageService();

  // forms:  cardinfo , pin , otp , address

  var currentForm = "cardinfo";
  Map<String, dynamic> pinpayload = {};
  String flw_ref = '';

  @override
  void initState() {
    super.initState();
    _getFormData();

    currentForm = "cardinfo";
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

  Future<void> _saveFormData() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('cardnumber', cardnumber.text);
    prefs.setString('cardholder', cardholder.text);
    prefs.setString('cvv', cvv.text);
    prefs.setString('expirydate', expirydate.text);
    prefs.setString('amount', amount.text);
    prefs.setString('email', email.text);
    prefs.setString('phone', phone.text);
    prefs.setString('fullname', fullname.text);
    prefs.setString('currency', currency.text);
  }

  Future<void> _getFormData() async {
    final prefs = await SharedPreferences.getInstance();
    cardnumber.text = prefs.getString('cardnumber') ?? '';
    cardholder.text = prefs.getString('cardholder') ?? '';
    cvv.text = prefs.getString('cvv') ?? '';
    expirydate.text = prefs.getString('expirydate') ?? '';
    amount.text = prefs.getString('amount') ?? '';
    email.text = prefs.getString('email') ?? '';
    phone.text = prefs.getString('phone') ?? '';
    fullname.text = prefs.getString('fullname') ?? '';
    currency.text = prefs.getString('currency') ?? '';
  }

  void clearCart(BuildContext context) {
    context.read<CartProvider>().removeAll();
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
          child: Container(
            decoration: BoxDecoration(
              //color: AppColors.primaryColor,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Column(
              children: [
                Container(
                  height: 130,
                  width: 150,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      image: const DecorationImage(
                        image: AssetImage(
                          'assets/images/visacard.png',
                        ),
                        fit: BoxFit.cover,
                      )),
                ),
                SizedBox(height: 30),
                Container(
                  padding: const EdgeInsets.all(45),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
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
                        color: AppColors.primarytextColor.withOpacity(0.3),
                        spreadRadius: 2,
                        blurRadius: 5,
                        offset: const Offset(4, 2),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      if (currentForm == "cardinfo") ...[
                        Form(
                          key: _formKey,
                          child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Text('Card Number'),
                                MyTextFormField(
                                    context,
                                    TextInputAction.next,
                                    '344******',
                                    TextInputType.text,
                                    false, (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter a full name';
                                  } else if (value.length < 16) {
                                    return 'Village must be at least 16 characters';
                                  }
                                  return null;
                                }, cardnumber, ''),
                                Text('Card Holder(Full name)'),
                                MyTextFormField(context, TextInputAction.next,
                                    '', TextInputType.text, false, (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter a full name';
                                  } else if (value.length < 5) {
                                    return 'Village must be at least 5 characters';
                                  }
                                  return null;
                                }, fullname, ''),
                                Text('CVV'),
                                MyTextFormField(context, TextInputAction.next,
                                    '', TextInputType.text, false, (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter a full name';
                                  } else if (value.length < 3) {
                                    return 'Village must be at least 3 characters';
                                  }
                                  return null;
                                }, cvv, ''),
                                Text('Expiry Date'),
                                MyTextFormField(
                                    context,
                                    TextInputAction.next,
                                    '13/May/2023',
                                    TextInputType.text,
                                    false, (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter a full name';
                                  } else if (value.length < 2) {
                                    return 'Village must be at least 10 characters';
                                  }
                                  return null;
                                }, expirydate, ''),
                                SizedBox(height: 10),
                                Text('Email'),
                                MyTextFormField(
                                    context,
                                    TextInputAction.next,
                                    '',
                                    TextInputType.emailAddress,
                                    false, (value) {
                                  if (value == null || value.isEmpty) {
                                    return "Please enter an email address";
                                  } else if (!value.contains('@')) {
                                    return 'Please enter a valid email address';
                                  }
                                  return null;
                                }, email, ''),
                                SizedBox(height: 10),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                      vertical: 10, horizontal: 15),
                                  decoration: BoxDecoration(
                                    color: AppColors.secondaryColor,
                                    borderRadius: BorderRadius.circular(5),
                                  ),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
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
                                  'Next',
                                  () async {
                                    // Handle the payment process
                                    await _saveFormData();
                                    if (_formKey.currentState!.validate() &&
                                        cardnumber.text.isNotEmpty &&
                                        fullname.text.isNotEmpty &&
                                        cvv.text.isNotEmpty &&
                                        expirydate.text.isNotEmpty &&
                                        email.text.isNotEmpty) {
                                      Map<String, dynamic> payment_payload = {
                                        "card_number": cardnumber.text,
                                        "fullname": fullname.text,
                                        "phone_number": "0" + widget.phone,
                                        "cvv": cvv.text,
                                        "amount": totalPrice,
                                        "email": email.text,
                                        "expiry_month":
                                            expirydate.text.split('/')[0],
                                        "expiry_year":
                                            expirydate.text.split('/')[1],
                                        "currency": "RWF",
                                      };
                                      Map<String, dynamic> requestData = {
                                        "shippingAddress": shippingAddress,
                                        "deliveryPreference": widget
                                            .deliverypreference
                                            .toLowerCase(),
                                        "items": cartItemsMapped,
                                        "amount": totalPrice,
                                        "phoneNumber": "0" + widget.phone,
                                        "email": email.text,
                                        "payment_payload": payment_payload,
                                      };

                                      print(
                                          "payclicked ${expirydate.text.split('/')[0]} ${expirydate.text.split('/')[1]}");
                                      setState(() {
                                        ispaying = true;
                                      });
                                      await payWithCard(
                                              requestData, token, context)
                                          .then((response) {
                                        setState(() {
                                          ispaying = false;
                                        });

                                        var mode = response['redirect_url'] ==
                                                    null ||
                                                response['redirect_url'] == ''
                                            ? response['authorization']['mode']
                                            : response['redirect_url'];

                                        var payload =
                                            response['redirect_url'] == null ||
                                                    response['redirect_url'] ==
                                                        ''
                                                ? response['payment_payload']
                                                : {"": ""};

                                        pinpayload =
                                            payload as Map<String, dynamic>;

                                        //  payment_payload: {card_number: 5531886652142950, fullname: oliviertecch, phone_number: 0784448194, cvv: 564, amount: 210, email: oliviercustomer@yopmail.com, expiry_month: 09, expiry_year: 32, currency: RWF, redirect_url: https://www.feliexpress.com, tx_ref: c630f4c0-dda0-479a-abe8-99d0ebf80e00}}
                                        print(
                                            "Payment response: ${response}   pinpayload ${pinpayload}    ");
                                        if (mode == "pin") {
                                          setState(() {
                                            currentForm = "pin";
                                            pinpayload =
                                                payload as Map<String, dynamic>;
                                          });
                                        } else if (mode == "avs_noauth") {
                                          setState(() {
                                            currentForm = "address";
                                            pinpayload =
                                                payload as Map<String, dynamic>;
                                          });
                                        } else if (response['redirect_url'] ==
                                            mode) {
                                          print(
                                              "response on card payment ${response}");

                                          var url = response['redirect_url'];

                                          if (url != null) {
                                            _launchURL(url).then((value) {
                                              print(
                                                  "URL launched successfully");
                                              clearCart(context);
                                              Navigator.popAndPushNamed(
                                                context,
                                                '/homepage',
                                              );
                                            }).catchError((error) {
                                              print(
                                                  "Error launching URL: $error");
                                            });
                                          }
                                        }

                                        Flushbar(
                                          message: 'Payment in progress...',
                                          duration: const Duration(seconds: 3),
                                          backgroundColor:
                                              AppColors.primaryColor,
                                          flushbarPosition:
                                              FlushbarPosition.TOP,
                                          margin: const EdgeInsets.all(8),
                                          padding: const EdgeInsets.all(10),
                                          borderRadius: BorderRadius.all(
                                              Radius.circular(8)),
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
                                        message:
                                            'Please fill in all the required fields',
                                        duration: const Duration(seconds: 3),
                                        flushbarPosition: FlushbarPosition.TOP,
                                        margin: const EdgeInsets.all(8),
                                        padding: const EdgeInsets.all(10),
                                        maxWidth: 200,
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(8)),
                                        backgroundColor: AppColors.primaryColor,
                                      ).show(context);
                                    }
                                  },
                                  ispaying,
                                  setLoading,
                                ),
                              ]),
                        ),
                      ] else if (currentForm == "pin") ...[
                        Form(
                            key: _formKey,
                            child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Text('Pin'),
                                  MyTextFormField(context, TextInputAction.next,
                                      '', TextInputType.text, false, (value) {
                                    if (value == null || value.isEmpty) {
                                      return 'Please enter pin';
                                    } else if (value.length < 3) {
                                      return 'Village must be at least 3 characters';
                                    }
                                    return null;
                                  }, pin, ''),
                                  SizedBox(height: 10),
                                  MyElevatedButton(
                                    context,
                                    50.0,
                                    'Next',
                                    () async {
                                      // Handle the payment process
                                      await _saveFormData();
                                      if (_formKey.currentState!.validate() &&
                                          pin.text.isNotEmpty) {
                                        Map<String, dynamic> payment_payload = {
                                          "pin": pin.text,
                                          "auth_mode": "pin",
                                          "payment_payload": {
                                            ...pinpayload,
                                            "enckey":
                                                "FLWSECK_TEST46515e8088a2",
                                          },
                                        };

                                        print("pinpayload ${pinpayload}    ");

                                        setState(() {
                                          ispaying = true;
                                        });
                                        await payWithCardPin(
                                                payment_payload, token, context)
                                            .then((response) {
                                          setState(() {
                                            currentForm = "otp";
                                            flw_ref = response['flw_ref'];
                                            ispaying = false;
                                          });

                                          print(
                                              "Payment response on pin: ${response}");

                                          Flushbar(
                                            message: 'Payment in progress...',
                                            duration:
                                                const Duration(seconds: 3),
                                            backgroundColor:
                                                AppColors.primaryColor,
                                            flushbarPosition:
                                                FlushbarPosition.TOP,
                                            margin: const EdgeInsets.all(8),
                                            padding: const EdgeInsets.all(10),
                                            borderRadius: BorderRadius.all(
                                                Radius.circular(8)),
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
                                          message:
                                              'Please fill in all the required fields',
                                          duration: const Duration(seconds: 3),
                                          flushbarPosition:
                                              FlushbarPosition.TOP,
                                          margin: const EdgeInsets.all(8),
                                          padding: const EdgeInsets.all(10),
                                          maxWidth: 200,
                                          borderRadius: BorderRadius.all(
                                              Radius.circular(8)),
                                          backgroundColor:
                                              AppColors.primaryColor,
                                        ).show(context);
                                      }
                                    },
                                    ispaying,
                                    setLoading,
                                  )
                                ]))
                      ] else if (currentForm == "address") ...[
                        Form(
                            key: _formKey,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Text('Country'),
                                MyTextFormField(context, TextInputAction.next,
                                    '', TextInputType.text, false, (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter Country';
                                  } else if (value.length < 3) {
                                    return 'must be at least 3 characters';
                                  }
                                  return null;
                                }, country, ''),
                                SizedBox(height: 10),
                                Text('City'),
                                MyTextFormField(context, TextInputAction.next,
                                    '', TextInputType.text, false, (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter City';
                                  } else if (value.length < 3) {
                                    return 'must be at least 3 characters';
                                  }
                                  return null;
                                }, city, ''),
                                SizedBox(height: 10),
                                Text('Address'),
                                MyTextFormField(context, TextInputAction.next,
                                    '', TextInputType.text, false, (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter Address ';
                                  } else if (value.length < 2) {
                                    return 'must be at least 2 characters';
                                  }
                                  return null;
                                }, addres, ''),
                                SizedBox(height: 10),
                                Text('Zip Code'),
                                MyTextFormField(context, TextInputAction.next,
                                    '', TextInputType.text, false, (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter Postal Code';
                                  } else if (value.length < 3) {
                                    return 'must be at least 3 characters';
                                  }
                                  return null;
                                }, postalcode, ''),
                                SizedBox(height: 10),
                                Text('State'),
                                MyTextFormField(context, TextInputAction.next,
                                    '', TextInputType.text, false, (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter State';
                                  } else if (value.length < 3) {
                                    return 'must be at least 3 characters';
                                  }
                                  return null;
                                }, state, ''),
                                SizedBox(height: 10),
                                MyElevatedButton(
                                  context,
                                  50.0,
                                  'Next',
                                  () async {
                                    // Handle the payment process
                                    await _saveFormData();
                                    if (_formKey.currentState!.validate() &&
                                        pin.text.isNotEmpty) {
                                      Map<String, dynamic> payment_payload = {
                                        "auth_mode": "avs_noauth",
                                        "city": city.text,
                                        "address": addres.text,
                                        "zipcode": postalcode.text,
                                        "state": state.text,
                                        "country": country.text,
                                        "payment_payload": {
                                          ...pinpayload,
                                          "enckey": "FLWSECK_TEST46515e8088a2",
                                        },
                                      };

                                      print("pinpayload ${pinpayload}    ");

                                      setState(() {
                                        ispaying = true;
                                      });
                                      await payWithCardPin(
                                              payment_payload, token, context)
                                          .then((response) {
                                        setState(() {
                                          currentForm = "otp";
                                          flw_ref = response['flw_ref'];
                                          ispaying = false;
                                        });

                                        print(
                                            "Payment response on pin: ${response}");

                                        Flushbar(
                                          message: 'Payment in progress...',
                                          duration: const Duration(seconds: 3),
                                          backgroundColor:
                                              AppColors.primaryColor,
                                          flushbarPosition:
                                              FlushbarPosition.TOP,
                                          margin: const EdgeInsets.all(8),
                                          padding: const EdgeInsets.all(10),
                                          borderRadius: BorderRadius.all(
                                              Radius.circular(8)),
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
                                        message:
                                            'Please fill in all the required fields',
                                        duration: const Duration(seconds: 3),
                                        flushbarPosition: FlushbarPosition.TOP,
                                        margin: const EdgeInsets.all(8),
                                        padding: const EdgeInsets.all(10),
                                        maxWidth: 200,
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(8)),
                                        backgroundColor: AppColors.primaryColor,
                                      ).show(context);
                                    }
                                  },
                                  ispaying,
                                  setLoading,
                                )
                              ],
                            ))
                      ] else if (currentForm == 'otp') ...[
                        Form(
                            key: _formKey,
                            child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Text('OTP'),
                                  MyTextFormField(context, TextInputAction.next,
                                      '', TextInputType.text, false, (value) {
                                    if (value == null || value.isEmpty) {
                                      return 'Please enter pin';
                                    } else if (value.length < 3) {
                                      return 'Village must be at least 3 characters';
                                    }
                                    return null;
                                  }, otp, ''),
                                  SizedBox(height: 10),
                                  MyElevatedButton(
                                    context,
                                    50.0,
                                    'Next',
                                    () async {
                                      // Handle the payment process
                                      await _saveFormData();
                                      if (_formKey.currentState!.validate() &&
                                          otp.text.isNotEmpty) {
                                        Map<String, dynamic> payment_payload = {
                                          "otp": otp.text,
                                          "flw_ref": flw_ref,
                                        };

                                        print("pinpayload ${pinpayload}    ");

                                        setState(() {
                                          ispaying = true;
                                        });

                                        await payWithOtp(
                                                payment_payload, token, context)
                                            .then((response) {
                                          setState(() {
                                            ispaying = false;
                                          });

                                          print(
                                              "Payment response on otp: ${response} ");
                                          Flushbar(
                                            message: "Payment successful",
                                            duration:
                                                const Duration(seconds: 3),
                                            backgroundColor:
                                                AppColors.primaryColor,
                                            flushbarPosition:
                                                FlushbarPosition.TOP,
                                            margin: const EdgeInsets.all(8),
                                            padding: const EdgeInsets.all(10),
                                            borderRadius: BorderRadius.all(
                                                Radius.circular(8)),
                                            maxWidth: 200,
                                          ).show(context);

                                          Future.delayed(
                                              const Duration(seconds: 3), () {
                                            Navigator.pushReplacementNamed(
                                                context, '/order_page');
                                          });
                                        }).catchError((error) {
                                          setState(() {
                                            ispaying = false;
                                          });

                                          print("Payment error: $error");
                                        });
                                      } else {
                                        Flushbar(
                                          message:
                                              'Please fill in all the required fields',
                                          duration: const Duration(seconds: 3),
                                          flushbarPosition:
                                              FlushbarPosition.TOP,
                                          margin: const EdgeInsets.all(8),
                                          padding: const EdgeInsets.all(10),
                                          maxWidth: 200,
                                          borderRadius: BorderRadius.all(
                                              Radius.circular(8)),
                                          backgroundColor:
                                              AppColors.primaryColor,
                                        ).show(context);
                                      }
                                    },
                                    ispaying,
                                    setLoading,
                                  )
                                ]))
                      ]
                    ],
                  ),
                ),
              ],
            ),
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
