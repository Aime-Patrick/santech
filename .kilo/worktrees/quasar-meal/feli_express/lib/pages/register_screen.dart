import 'package:feli_express/functions/Apis/authentication.api.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/companylogo.dart';
import 'package:feli_express/widgets/elevatedbutton.dart';
import 'package:feli_express/widgets/textformfield.dart';
import 'package:flutter/material.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegistorPageState();
}

class _RegistorPageState extends State<RegisterPage> {
  final TextEditingController firstNameController = TextEditingController();
  final TextEditingController lastNameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController =
      TextEditingController();

  bool _isLoading = false;
  void setLoading(bool loading) {
    setState(() {
      _isLoading = loading;
    });
  }

  var isLoggingin = false;

  @override
  Widget build(BuildContext context) {
    bool _LostPassWord = false;
    final GlobalKey<FormState> formKey = GlobalKey<FormState>();

    return Scaffold(
        backgroundColor: AppColors.AppColor,
        appBar: AppBar(
          backgroundColor: AppColors.AppColor,
          elevation: 0,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
        body: SingleChildScrollView(
          //alignment: Alignment.center,
          // margin: const EdgeInsets.only(top: 20),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                // companyLogo(
                //   context,
                // ),

                const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.person_add_outlined,
                    ),
                    SizedBox(width: 10),
                    Text(
                      'Register',
                      style: TextStyle(
                        color: AppColors.primarytextColor,
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),

                const Text(
                  '........We are here for you...........',
                  style: TextStyle(
                    color: AppColors.primarytextColor,
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.only(
                      left: 60, top: 0, right: 60, bottom: 10),
                  child: Form(
                    key: formKey,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'first Name',
                          style: TextStyle(
                            color: AppColors.primarytextColor,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 10),
                        MyTextFormField(context, TextInputAction.next, '',
                            TextInputType.text, false, (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a first name';
                          } else if (value.length < 5) {
                            return 'First name must be at least 5 characters';
                          }
                          return null;
                        }, firstNameController, ''),
                        const SizedBox(height: 10),
                        const Text(
                          'Last Name',
                          style: TextStyle(
                            color: AppColors.primarytextColor,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 10),
                        MyTextFormField(context, TextInputAction.next, '',
                            TextInputType.text, false, (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a last name';
                          } else if (value.length < 5) {
                            return 'Last name must be at least 5 characters';
                          }
                          return null;
                        }, lastNameController, ''),
                        const SizedBox(height: 10),
                        const Text(
                          'Email Address',
                          style: TextStyle(
                            color: AppColors.primarytextColor,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 10),
                        MyTextFormField(context, TextInputAction.next, '',
                            TextInputType.emailAddress, false, (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter an email address';
                          } else if (!value.contains('@')) {
                            return 'Please enter a valid email address';
                          }
                          return null;
                        }, emailController, ''),
                        const SizedBox(height: 10),
                        const Text(
                          'Password',
                          style: TextStyle(
                            color: AppColors.primarytextColor,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 10),
                        MyTextFormField(context, TextInputAction.next, '',
                            TextInputType.visiblePassword, true, (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a password';
                          } else if (value.length < 8) {
                            return 'Password must be at least 8 characters';
                          }
                          return null;
                        }, passwordController, ''),
                        const SizedBox(height: 10),
                        const Text(
                          'confirmPassword',
                          style: TextStyle(
                            color: AppColors.primarytextColor,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 10),
                        MyTextFormField(context, TextInputAction.next, '',
                            TextInputType.visiblePassword, true, (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please confirm your password';
                          } else if (value.length < 8) {
                            return 'Password must be at least 8 characters';
                          }
                          return null;
                        }, confirmPasswordController, ''),
                      ],
                    ),
                  ),
                ),
                // Row(
                //   mainAxisAlignment: MainAxisAlignment.center,
                //   children: [
                //     Checkbox(
                //       value: _LostPassWord,
                //       onChanged: (bool? value) {
                //         setState(() {
                //           _LostPassWord = value!;
                //         });
                //       },
                //     ),
                //     const Text(
                //       'Lost your password? ',
                //       style: TextStyle(
                //         color: AppColors.primarytextColor,
                //         fontSize: 10,
                //         fontWeight: FontWeight.bold,
                //       ),
                //     ),
                //   ],
                // ),
                const SizedBox(height: 10),
                MyElevatedButton(
                  context,
                  40.0,
                  'Register',
                  () async {
                    if (!formKey.currentState!.validate()) {
                      print(
                          'First Name: ${firstNameController.text} Last Name: ${lastNameController.text} Email: ${emailController.text} Password: ${passwordController.text}');

                      try {
                        setState(() {
                          isLoggingin = true;
                        });
                        await signUp(
                          firstNameController.text,
                          lastNameController.text,
                          emailController.text,
                          passwordController.text,
                          confirmPasswordController.text,
                        ).then((value) => {
                              if (value != null)
                                {
                                  setState(() {
                                    isLoggingin = false;
                                  }),
                                  Navigator.pushNamed(
                                    context,
                                    '/login',
                                  ),
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      behavior: SnackBarBehavior.floating,
                                      margin: const EdgeInsets.all(5),
                                      backgroundColor: AppColors.primaryColor,
                                      duration: const Duration(seconds: 3000),
                                      showCloseIcon: true,
                                      content: Text('${value['data']}'),
                                    ),
                                  )
                                }
                            });
                        // }
                        // print('response on signup  value ${value.data}'));
                      } catch (e) {
                        setState(() {
                          isLoggingin = false;
                        });
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            behavior: SnackBarBehavior.floating,

                            margin: const EdgeInsets.all(5),

                            backgroundColor: AppColors.errorcolor,
                            duration: const Duration(seconds: 3000),
                            showCloseIcon:
                                true, // by default it will show after 4 seconds
                            content: Text(
                                '${e.toString().split(':')[1].split('}')[0]}'),
                          ),
                        );
                      }
                    }
                  },
                  isLoggingin,
                  setLoading,
                ),
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      ' Already have an account?',
                      style: TextStyle(
                        color: AppColors.primarytextColor,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(width: 10),
                    _isLoading
                        ? const CircularProgressIndicator(
                            color: AppColors.primaryColor,
                            semanticsLabel: 'Loading...',
                            strokeWidth: 5.0,
                          )
                        : TextButton(
                            onPressed: () async {
                              setState(() {
                                _isLoading = true;
                              });
                              await Future.delayed(const Duration(seconds: 2));
                              Navigator.pushNamed(context, '/login');
                              setState(() {
                                _isLoading = false;
                              });
                            },
                            child: const Text(
                              'login',
                              style: TextStyle(
                                color: AppColors.primaryColor,
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          )
                  ],
                )
              ]),
        ));
  }
}
