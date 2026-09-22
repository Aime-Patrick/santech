import 'package:feli_express/functions/Apis/authentication.api.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/companylogo.dart';
import 'package:feli_express/widgets/elevatedbutton.dart';
import 'package:feli_express/widgets/textformfield.dart';
import 'package:flutter/material.dart';
import 'package:localstorage/localstorage.dart';

class LoginPage extends StatefulWidget {
  LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  //bool _LostPassWord = false;
}

class _LoginPageState extends State<LoginPage> {
  bool _isLoading = false;
  void setLoading(bool loading) {
    setState(() {
      _isLoading = loading;
    });
  }

  var isLoggingin = false;

  final LocalStorage storage = new LocalStorage('user_data');

  @override
  Widget build(BuildContext context) {
    final GlobalKey<FormState> formKey = GlobalKey<FormState>();
    final TextEditingController emailController = TextEditingController();
    final TextEditingController passwordController = TextEditingController();
    bool _LostPassWord = false;
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
            // margin: const EdgeInsets.only(top: 20),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
              companyLogo(
                context,
              ),
              // const SizedBox(height: 10),
              const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.login,
                  ),
                  SizedBox(width: 10),
                  Text(
                    'Login',
                    style: TextStyle(
                      color: AppColors.primarytextColor,
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),

              const Text(
                '... Order what you want ...',
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
                        'email address',
                        style: TextStyle(
                          color: AppColors.primarytextColor,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 10),
                      MyTextFormField(context, TextInputAction.next, '',
                          TextInputType.emailAddress, false, (value) {
                        if (value == null || value.isEmpty) {
                          return "Please enter an email address";
                        } else if (!value.contains('@')) {
                          return 'Please enter a valid email address';
                        }
                        // return null;
                      }, emailController, ''),
                      const SizedBox(height: 10),
                      Text(
                        'password',
                        style: TextStyle(
                          color: AppColors.primarytextColor,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 10),
                      MyTextFormField(context, TextInputAction.next, '',
                          TextInputType.visiblePassword, true, (value) {
                        if (value == null || value.isEmpty) {
                          return "Please enter a password";
                        } else if (value.length < 8) {
                          return 'Password must be at least 8 characters';
                        }
                        // return null;
                      }, passwordController, ''),
                    ],
                  ),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Checkbox(
                    value: _LostPassWord,
                    onChanged: (bool? value) {
                      setState(() {
                        _LostPassWord = value!;
                      });
                    },
                  ),
                  const Text(
                    'Lost your password?',
                    style: TextStyle(
                      color: AppColors.primarytextColor,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              MyElevatedButton(
                context,
                40.0,
                'Login',
                () async {
                  if (formKey.currentState!.validate()) {
                    print(
                        'Email: ${emailController.text}, Password: ${passwordController.text}');

                    try {
                      setState(() {
                        isLoggingin = true;
                      });
                      await signIn(
                              emailController.text, passwordController.text)
                          .then((value) => {
                                if (value != null)
                                  {
                                    setState(() {
                                      isLoggingin = false;
                                    }),
                                    print('response on login page $value '),
                                    Navigator.pushReplacementNamed(
                                      context,
                                      '/homepage',
                                    ),
                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(SnackBar(
                                      behavior: SnackBarBehavior.floating,
                                      margin: const EdgeInsets.all(5),
                                      backgroundColor: AppColors.primaryColor,
                                      duration: const Duration(seconds: 3000),
                                      showCloseIcon: true,
                                      content: Text(
                                        'Hello ! ${value['user']['firstName']} Wellcome to Feli Express',
                                      ),
                                    ))
                                  }
                              });
                    } catch (e) {
                      setState(() {
                        isLoggingin = false;
                      });
                      print('response on login page $e');
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
              const SizedBox(height: 30),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Forgot your password?',
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
                            Navigator.pushNamed(context, '/reset_password');
                            setState(() {
                              _isLoading = false;
                            });
                          },
                          child: const Text(
                            'Reset Password',
                            style: TextStyle(
                              color: AppColors.primaryColor,
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        )
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Don\'t have an account?',
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
                            Navigator.pushNamed(context, '/register');
                            setState(() {
                              _isLoading = false;
                            });
                          },
                          child: const Text(
                            'Register',
                            style: TextStyle(
                              color: AppColors.primaryColor,
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        )
                ],
              )
            ])));
  }
}
