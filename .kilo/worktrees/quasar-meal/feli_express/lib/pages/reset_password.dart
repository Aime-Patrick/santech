import 'package:another_flushbar/flushbar.dart';
import 'package:feli_express/functions/Apis/forgotpassword.api.dart';
import 'package:feli_express/utils/colors.dart';
import 'package:feli_express/widgets/companylogo.dart';
import 'package:feli_express/widgets/elevatedbutton.dart';
import 'package:feli_express/widgets/textformfield.dart';
import 'package:flutter/material.dart';

class ResetPassword extends StatefulWidget {
  const ResetPassword({super.key});

  @override
  State<ResetPassword> createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  final TextEditingController emailController = TextEditingController();
  bool _isLoading = false;

  void setLoading(bool loading) {
    setState(() {
      _isLoading = loading;
    });
  }

Future<void> handleResetPassword() async {
  if (formKey.currentState?.validate() ?? false) {
    setLoading(true);
    try {
      print('Sending reset password email...');
      await sendResetPasswordEmail(emailController.text);
      print('Email sent successfully.');
      Flushbar(
        title: 'Success',
        message: 'Check your email to reset your password',
        duration: const Duration(seconds: 2),
        backgroundColor: AppColors.primaryColor,
        maxWidth: 400,
        borderRadius: BorderRadius.circular(8),
        flushbarPosition: FlushbarPosition.TOP,
      ).show(context);
      print('Flushbar shown.');
      // Navigate to the code confirmation screen
      //Navigator.pushNamed(context, '/code_confirmation');
    } catch (error) {
      print('Error: $error');
      // Show an error message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to send password reset email: $error')),
      );
    } finally {
      setLoading(false);
    }
  }
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            companyLogo(context),
            const SizedBox(height: 10),
            const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.login),
                SizedBox(width: 10),
                Text(
                  'Reset Password',
                  style: TextStyle(
                    color: AppColors.primarytextColor,
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            const Text(
              'Lost your password? Please enter your email address. You ',
              style: TextStyle(
                color: AppColors.primarytextColor,
                fontSize: 8,
                fontWeight: FontWeight.bold,
              ),
            ),
            const Text(
              'will receive a link to create a new password via email.',
              style: TextStyle(
                color: AppColors.primarytextColor,
                fontSize: 8,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 30),
            Container(
              padding: const EdgeInsets.only(left: 60, top: 60, right: 60, bottom: 10),
              child: Form(
                key: formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Email Address',
                      style: TextStyle(
                        color: AppColors.primarytextColor,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    MyTextFormField(
                      context,
                      TextInputAction.next,
                      '',
                      TextInputType.emailAddress,
                      false,
                      (value) {
                        if (value == null || value.isEmpty) {
                          return "Please enter an email address";
                        } else if (!value.contains('@')) {
                          return 'Please enter a valid email address';
                        }
                        return null;
                      },
                      emailController,
                      '',
                    ),
                    const SizedBox(height: 30),
                    MyElevatedButton(
                      context,
                      40.0,
                      'Send',
                      handleResetPassword,
                      _isLoading,
                      setLoading,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
