# RAMS Tasarım İlkeleri Analizi

Bu doküman, YM-AR projesinin Güvenilirlik (Reliability), Kullanılabilirlik/Erişilebilirlik (Availability), Bakım Yapılabilirlik (Maintainability) ve Emniyet (Safety) prensiplerini nasıl karşıladığını analiz eder.

## 1. Reliability (Güvenilirlik)
- **Tanım:** Sistemin belirli şartlar altında hatasız çalışma yeteneği.
- **Projedeki Karşılığı:** 
  - Projede kullanılan MindAR kütüphanesi görüntü işleme için stabil bir algoritma sunar.
  - React'in state yönetimi sayesinde uygulama bileşenleri arasında veri akışı tutarlıdır. 
  - Kamera izni verilmediğinde veya model yüklenemediğinde çökmek yerine kullanıcıya "Hata Oluştu" (Error Boundary / Fallback UI) ekranı gösterilir.

## 2. Availability (Erişilebilirlik / Kullanıma Hazır Olma)
- **Tanım:** Sistemin istendiği anda çalışır durumda olma yüzdesi.
- **Projedeki Karşılığı:**
  - Web tabanlı (WebAR) mimari kullanıldığı için kullanıcılar 7/24 internet tarayıcılarından sisteme erişebilir. Herhangi bir App Store onay süreci veya güncelleme bekleme süresi yoktur.
  - Uygulama Vite ile statik dosyalar olarak derlendiği için standart bir CDN veya statik sunucuda %99.9 uptime ile barındırılabilir.

## 3. Maintainability (Bakım Yapılabilirlik)
- **Tanım:** Sistemin arıza durumunda onarılabilme veya yeni özellikler eklenebilme kolaylığı.
- **Projedeki Karşılığı:**
  - **Modüler Yapı:** Proje React componentleri (`ARScene`, `StartScreen`, `FishInfoCard`) şeklinde ayrılmıştır.
  - **Konfigürasyon Yönetimi:** Yeni deniz canlıları eklemek için kod yazmaya gerek yoktur; sadece `fishConfig.js` dosyasına yeni bir obje ve `public` klasörüne modeller eklenir.
  - **Temiz Kod:** Gereksiz dosyalar temizlenmiş, bağımlılıklar (`package.json`) sabitlenmiştir (MindAR 1.2.5 ve uyumlu Three.js 0.153.0).

## 4. Safety (Emniyet / Güvenlik)
- **Tanım:** Sistemin kullanıcıya, veriye veya çevreye zarar vermemesi.
- **Projedeki Karşılığı:**
  - **Veri Gizliliği:** Kamera görüntüleri hiçbir şekilde bir sunucuya gönderilmez veya kaydedilmez. Tüm görüntü işleme (Image Tracking) işlemi istemci (client) cihazında yerel olarak gerçekleşir.
  - **Kullanıcı İzinleri:** Kamera, sistem tarafından otomatik olarak gasp edilmez. Kullanıcının tarayıcı üzerinden açıkça izin (Explicit Consent) vermesi gerekir.
  - **Memory Leak Engelleme:** Kamera sahnesi kapatıldığında veya kullanıcı ana ekrana döndüğünde Three.js `renderer` yok edilir (dispose) ve kamera stream kanalları güvenli bir şekilde kapatılır, böylece cihazın batarya ve rami tükenmez.
