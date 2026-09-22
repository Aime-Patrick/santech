import 'package:feli_express/functions/Apis/profile.api.dart';
import 'package:feli_express/services/storage/local-storage.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class UpdateUserNames extends StatefulWidget {
  const UpdateUserNames({super.key});

  @override
  State<UpdateUserNames> createState() => _UpdateUserNamesState();
}

class _UpdateUserNamesState extends State<UpdateUserNames> {
  bool isUpdating = false;
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  final TextEditingController firstName = TextEditingController();
  final TextEditingController lastName = TextEditingController();
  var user = {};
  late String token;
  LocalStorageService localStorageService = LocalStorageService();

  @override
  void initState() {
    super.initState();
    // futureproduct.getProduct();
    // user = {};
    localStorageService.getUserData().then((value) {
      print("user on homepag  $value");
      setState(() {
        user = value ?? {};
        firstName.text = user['firstName'];
        lastName.text = user['lastName'];
      });
    });

    localStorageService.getToken().then((value) {
      print("token: $value");
      setState(() {
        token = value ?? '';
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      clipBehavior: Clip.none,
      backgroundColor: Colors.grey[200],
      title: Text(
        'Update User names',
        style: TextStyle(
          color: AppColors.primaryColor,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Form(
            key: formKey,
            child: Column(
              children: [
                TextFormField(
                  controller: firstName,
                  decoration: InputDecoration(
                    labelText: 'First Name',
                    hintText: 'Enter your first name',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a first name';
                    } else if (value.length < 2) {
                      return 'First name must be at least 2 characters';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: lastName,
                  decoration: InputDecoration(
                    labelText: 'Last Name',
                    hintText: 'Enter your last name',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a last name';
                    } else if (value.length < 2) {
                      return 'Last name must be at least  2 characters';
                    }
                    return null;
                  },
                ),
              ],
            ),
          ),
          SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              TextButton(
                child: const Text(
                  'Close',
                  style: TextStyle(color: Colors.red),
                ),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
              ElevatedButton(
                onPressed: () async {
                  if (formKey.currentState!.validate()) {
                    await updateUsernamesApi(
                            firstName.text, lastName.text, token, context)
                        .then(
                      (value) {
                        localStorageService
                            .setUserData({
                              'firstName': firstName.text,
                              'lastName': lastName.text,
                            })
                            .then(
                              (value) => Navigator.pushReplacementNamed(
                                  context, '/homepage'),

                              //  Navigator.pop(context),
                            )
                            .catchError(
                                (error) => print('Failed to update user data'));

                        return value;
                      },
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5),
                  ),
                ),
                child: Text(
                  'Update',
                  style: TextStyle(
                    color: AppColors.primaryColor,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
