import 'package:another_flushbar/flushbar.dart';
import 'package:csc_picker/csc_picker.dart';
import 'package:feli_express/models/cart.model.dart';
import 'package:feli_express/pages/cardpayment-page.dart';
import 'package:feli_express/pages/mobilemoney-page.dart';
import 'package:feli_express/services/state-management/cart.provider.dart';
import 'package:feli_express/services/state-management/product.provider.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/province.dart';
import 'package:feli_express/widgets/textformfield.dart';
import 'package:flutter/material.dart';
import 'package:intl_phone_field/intl_phone_field.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CheckoutPage extends StatefulWidget {
  const CheckoutPage({Key? key}) : super(key: key);

  @override
  State<CheckoutPage> createState() => _CheckoutPageState();
}

class _CheckoutPageState extends State<CheckoutPage> {
  int selectedIndex = 0;
  bool _isLoading = false;
  String _selectedPaymentMethod = 'MTN';
  String _hoveredPaymentMethod = '';
  final TextEditingController phoneController = TextEditingController();

  String? selectedProvince;
  String? selectedDistrict;
  String? selectedSector;
  String? village;
  String? cell;
  String? street;
  String? delivery;
  List<District> districts = [];
  List<String> sectors = [];

  void setLoading(bool loading) {
    setState(() {
      _isLoading = loading;
    });
  }

  void _selectPaymentMethod(String method) {
    setState(() {
      _selectedPaymentMethod = method;
    });
  }

  void _hoverPaymentMethod(String method) {
    setState(() {
      _hoveredPaymentMethod = method;
    });
  }

  void _unhoverPaymentMethod() {
    setState(() {
      _hoveredPaymentMethod = '';
    });
  }

  final __formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _loadFormData();
  }

  Future<void> _saveFormData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('selectedProvince', selectedProvince ?? '');
    await prefs.setString('selectedDistrict', selectedDistrict ?? '');
    await prefs.setString('selectedSector', selectedSector ?? '');
    await prefs.setString('cell', cell ?? '');
    await prefs.setString('village', village ?? '');
    await prefs.setString('street', street ?? '');
    await prefs.setString('phone', phoneController.text);
    await prefs.setString('delivery', delivery ?? '');
  }

  Future<void> _loadFormData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      selectedProvince = prefs.getString('selectedProvince');
      selectedDistrict = prefs.getString('selectedDistrict');
      selectedSector = prefs.getString('selectedSector');
      cell = prefs.getString('cell');
      village = prefs.getString('village');
      street = prefs.getString('street');
      phoneController.text = prefs.getString('phone') ?? '';
      delivery = prefs.getString('delivery');
    });
  }

  @override
  Widget build(BuildContext context) {
    var cartData = context.watch<CartProvider>();
    int totalQuantity = cartData.cartItems.length;
    double totalPrice = cartData.totalPrice as double;
    List<CartItem> allItems = cartData.cartItems;
    final product2 = context.watch<ProductProvider>().products;
    String selectedCountry = "Rwanda";

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Shipping Address',
          style: TextStyle(color: Colors.black),
          textAlign: TextAlign.center,
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(55),
        child: Container(
          width: 700,
          child: Form(
            key: __formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Country'),
                CSCPicker(
                  defaultCountry: CscCountry.Rwanda,
                  onCountryChanged: (value) {
                    print(value);
                    selectedCountry = value;
                  },
                  onStateChanged: (value) {
                    print(value);
                  },
                  onCityChanged: (value) {
                    print(value);
                  },
                  showStates: false,
                  showCities: false,
                  flagState: CountryFlag.SHOW_IN_DROP_DOWN_ONLY,
                  dropdownDecoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    border: Border.fromBorderSide(
                        BorderSide(color: AppColors.secondaryColor)),
                  ),
                  disabledDropdownDecoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    border: Border.fromBorderSide(
                        BorderSide(color: AppColors.secondaryColor)),
                  ),
                ),
                SizedBox(height: 10),
                Text('Province'),
                SizedBox(
                  //height: 40,
                  child: DropdownButtonFormField<String>(
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                        ),
                        contentPadding: EdgeInsets.all(5),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                          borderSide:
                              BorderSide(color: AppColors.primarytextColor),
                        )),
                    validator: (value) {
                      if (value == null) {
                        return 'Please select a province';
                      }
                      return null;
                    },
                    hint: Text(''),
                    value: selectedProvince,
                    onChanged: (String? newValue) {
                      setState(() {
                        selectedProvince = newValue;
                        districts = provinces
                            .firstWhere((province) => province.name == newValue)
                            .districts;
                        selectedDistrict = null;
                        selectedSector = null;
                        sectors = [];
                      });
                    },
                    items: provinces
                        .map<DropdownMenuItem<String>>((Province province) {
                      return DropdownMenuItem<String>(
                        value: province.name,
                        child: Text(province.name),
                      );
                    }).toList(),
                  ),
                ),
                SizedBox(height: 10),
                Text('District'),
                SizedBox(
                  //height: 40,
                  child: DropdownButtonFormField<String>(
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                        ),
                        contentPadding: EdgeInsets.all(5),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                          borderSide:
                              BorderSide(color: AppColors.primarytextColor),
                        )),
                    validator: (value) {
                      if (value == null) {
                        return 'Please select a district';
                      }
                      return null;
                    },
                    hint: Text(''),
                    value: selectedDistrict,
                    onChanged: (String? newValue) {
                      setState(() {
                        selectedDistrict = newValue;
                        sectors = districts
                            .firstWhere((district) => district.name == newValue)
                            .sectors;
                        selectedSector = null;
                      });
                    },
                    items: districts
                        .map<DropdownMenuItem<String>>((District district) {
                      return DropdownMenuItem<String>(
                        value: district.name,
                        child: Text(district.name),
                      );
                    }).toList(),
                  ),
                ),
                SizedBox(height: 10),
                Text('Sector'),
                SizedBox(
                  //height: 40,
                  child: DropdownButtonFormField<String>(
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                        ),
                        contentPadding: EdgeInsets.all(5),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                          borderSide:
                              BorderSide(color: AppColors.primarytextColor),
                        )),
                    validator: (value) {
                      if (value == null) {
                        return 'Please select a sector';
                      }
                      return null;
                    },
                    hint: Text(''),
                    value: selectedSector,
                    onChanged: (String? newValue) {
                      setState(() {
                        selectedSector = newValue;
                      });
                    },
                    items:
                        sectors.map<DropdownMenuItem<String>>((String sector) {
                      return DropdownMenuItem<String>(
                        value: sector,
                        child: Text(sector),
                      );
                    }).toList(),
                  ),
                ),
                SizedBox(height: 10),
                Text('Cell'),
                SizedBox(height: 10),
                MyTextFormField(context, TextInputAction.next, '',
                    TextInputType.text, false, (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a Cell';
                  } else if (value.length < 3) {
                    return 'Cell must be at least 3 characters';
                  }
                  cell = value;
                  return null;
                }, TextEditingController(), ''),
                SizedBox(height: 10),
                Text('Village'),
                SizedBox(height: 10),
                MyTextFormField(context, TextInputAction.next, '',
                    TextInputType.text, false, (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a Village';
                  } else if (value.length < 3) {
                    return 'Village must be at least 3 characters';
                  }
                  village = value;
                  return null;
                }, TextEditingController(), ''),
                SizedBox(height: 10),
                Text('Street'),
                SizedBox(height: 10),
                MyTextFormField(context, TextInputAction.next, '',
                    TextInputType.text, false, (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a Street';
                  } else if (value.length < 3) {
                    return 'Street must be at least 3 characters';
                  }
                  street = value;
                  return null;
                }, TextEditingController(), ''),
                SizedBox(height: 10),
                Text('Phone Number'),
                SizedBox(
                  //height: 50,
                  child: IntlPhoneField(
                    controller: phoneController,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                        ),
                        contentPadding: EdgeInsets.all(5),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                          borderSide:
                              BorderSide(color: AppColors.primarytextColor),
                        )),
                    validator: (value) {
                      if (value == null || value.completeNumber.isEmpty) {
                        return 'Please enter a phone number';
                      }
                      return null;
                    },
                    initialCountryCode: 'RW',
                    onChanged: (phone) {
                      print(phone.completeNumber);
                    },
                  ),
                ),
                Text('Delivery preferences'),
                SizedBox(
                  //height: 40,
                  child: DropdownButtonFormField(
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                        ),
                        contentPadding: EdgeInsets.all(5),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                          borderSide:
                              BorderSide(color: AppColors.primarytextColor),
                        )),
                    validator: (value) {
                      if (value == null) {
                        return 'Please select a delivery preference';
                      }
                      return null;
                    },
                    items: const [
                      DropdownMenuItem(
                        child: Text('PickUp'),
                        value: 'PickUp',
                      ),
                      DropdownMenuItem(
                        child: Text('Delivery'),
                        value: 'Delivery',
                      ),
                    ],
                    onChanged: (value) {
                      delivery = value.toString();
                      print(value);
                    },
                  ),
                ),
                SizedBox(height: 20),
                Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.orange,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    onPressed: () async {
                      if (__formKey.currentState!.validate() &&
                          selectedProvince != null &&
                          selectedDistrict != null &&
                          selectedSector != null &&
                          phoneController.text.isNotEmpty) {
                        await _saveFormData();
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => MobileMoneyPage(
                                selectedCountry,
                                selectedProvince,
                                selectedDistrict,
                                selectedSector,
                                cell,
                                village,
                                phoneController.text,
                                delivery,
                                street),
                          ),
                        );
                      } else {
                        Flushbar(
                          margin: const EdgeInsets.all(8),
                          padding: const EdgeInsets.all(10),
                          borderRadius: BorderRadius.all(Radius.circular(8)),
                          maxWidth: 200,
                          backgroundColor: AppColors.primaryColor,
                          message: 'Please fill in all fields',
                          duration: const Duration(seconds: 3),
                          flushbarPosition: FlushbarPosition.TOP,
                        ).show(context);
                      }
                    },
                    child: const Text(
                      'Mobile Money',
                      style: TextStyle(
                        color: AppColors.AppColor,
                      ),
                    ),
                  ),
                  SizedBox(width: 10),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    onPressed: () async {
                      if (__formKey.currentState!.validate() &&
                          selectedProvince != null &&
                          selectedDistrict != null &&
                          selectedSector != null &&
                          phoneController.text.isNotEmpty) {
                        await _saveFormData();
                        print('Validated');
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => CardPaymentPage(
                                selectedCountry,
                                selectedProvince,
                                selectedDistrict,
                                selectedSector,
                                cell,
                                village,
                                phoneController.text,
                                delivery,
                                street),
                          ),
                        );
                      } else {
                        Flushbar(
                          margin: const EdgeInsets.all(8),
                          padding: const EdgeInsets.all(10),
                          borderRadius: BorderRadius.all(Radius.circular(8)),
                          maxWidth: 200,
                          backgroundColor: AppColors.primaryColor,
                          message: 'Please fill in all fields',
                          duration: const Duration(seconds: 3),
                          flushbarPosition: FlushbarPosition.TOP,
                        ).show(context);
                      }
                    },
                    child: const Text(
                      'Card',
                      style: TextStyle(
                        color: AppColors.AppColor,
                      ),
                    ),
                  ),
                ]),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
