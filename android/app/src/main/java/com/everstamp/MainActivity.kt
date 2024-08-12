package com.everstamp

import android.os.Bundle
import com.facebook.react.ReactActivity
import android.webkit.WebView
import android.webkit.WebViewClient

import android.content.Intent
import android.os.Handler
import org.devio.rn.splashscreen.SplashScreen; // 추가

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
      SplashScreen.show(this, R.style.AppTheme, true);
      super.onCreate(savedInstanceState)
    }

    override fun getMainComponentName(): String? {
      return "everstamp" 
    }
}