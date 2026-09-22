import 'package:feli_express/utils/colors.dart';
import 'package:flutter/material.dart';

Widget MyTextFormField(
  BuildContext context,
  TextInputAction textInputAction,
  String hint,
  TextInputType keyboardType,
  bool obscureText,
  String? Function(String?)? validator,
  TextEditingController inputContrlor,
  String field,
) {
  String? localValidator(String? value) {
    if (validator != null) {
      final result = validator(value);
      if (result != null) return result;
    }

    switch (field) {
      case "email":
        if (value == null || value.isEmpty) {
          return "Please enter an email";
        } else if (!value.contains('@') ||
            !value.contains('.') ||
            value.length < 5) {
          return 'Please enter a valid email';
        }
        break;
      case "password":
        if (value == null || value.isEmpty) {
          return "Please enter a password";
        } else if (value.length < 8) {
          return 'Password must be at least 8 characters';
        }
        break;
      case "lastName":
        if (value == null || value.isEmpty) {
          return "Please enter a last name";
        } else if (value.length < 16) {
          return 'Last name must be at least 16 characters';
        }
        break;
      case "firstName":
        if (value == null || value.isEmpty) {
          return "Please enter a first name";
        } else if (value.length < 16) {
          return 'First name must be at least 16 characters';
        }
        break;
      case "verification":
        if (value == null || value.isEmpty) {
          return "Please enter a verification code";
        } else if (value.length < 6) {
          return 'Verification code must be at least 6 characters';
        }
        break;
      case "newPassword":
        if (value == null || value.isEmpty) {
          return "Please enter a new password";
        } else if (value.length < 10) {
          return 'Password must be at least 10 characters';
        }
        break;
      case "confirmNewPassword":
        if (value == null || value.isEmpty) {
          return "Please confirm your new password";
        } else if (value.length < 10) {
          return 'Password must be at least 10 characters';
        }
        break;
      case "code":
        if (value == null || value.isEmpty) {
          return "Please enter a verification code";
        } else if (value.length < 6) {
          return 'Verification code must be at least 6 characters';
        }
        break;
      default:
        return null;
    }
    return null;
  }

  return SizedBox(
    //height: 40.0,
    width: double.infinity,
    child: TextFormField(
      controller: inputContrlor,
      keyboardType: TextInputType.text,
      validator: localValidator,
      obscureText: obscureText,
      textInputAction: textInputAction,
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: const TextStyle(
          color: AppColors.primarytextColor,
          fontSize: 9,
        ),
        filled: true,
        fillColor: AppColors.AppColor,
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10.0),
          borderSide: const BorderSide(
            color: AppColors.primarytextColor,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(5),
          borderSide: const BorderSide(
            color: AppColors.primarytextColor,
          ),
        ),
        contentPadding: EdgeInsets.all(5),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(
            color: AppColors.errorcolor,
          ),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(
            color: AppColors.errorcolor,
          ),
        ),
      ),
    ),
  );
}
