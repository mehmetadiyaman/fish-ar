# SWOT Analizi: YM-AR Projesi

## Strengths (Güçlü Yönler)
- **Erişilebilirlik:** WebAR kullanıldığı için kullanıcıların ekstra bir uygulama indirmesine gerek yoktur; doğrudan tarayıcı üzerinden çalışır.
- **Performans:** Three.js ve Vite altyapısı sayesinde modeller hızlı yüklenir, kod bölme (code-splitting) ile başlangıç yükü hafiftir.
- **Kullanıcı Deneyimi:** Modern, cam efekti (glassmorphism) içeren arayüz ve çoklu dokunmatik (gesture) kontrolleri ile kullanımı sezgiseldir.
- **Ölçeklenebilirlik:** Projenin konfigürasyon tabanlı mimarisi (fishConfig.js) sayesinde yeni canlı modelleri koda dokunmadan eklenebilir.

## Weaknesses (Zayıf Yönler)
- **Ortam Bağımlılığı:** Marker tabanlı sistem (Image Tracking), kameranın iyi ışık almasına ve hedefin net görünmesine bağımlıdır.
- **Donanım İhtiyacı:** Eski nesil telefonların kameralarında ve işlemcilerinde 3D render işlemi sırasında performans kayıpları yaşanabilir.
- **Bağımlılıklar:** MindAR ve Three.js versiyon uyumluluklarına sıkı sıkıya bağlıdır.

## Opportunities (Fırsatlar)
- **Eğitim Sektörü:** Okullarda biyoloji veya fen bilgisi dersleri için eğitici ve etkileşimli bir materyal olarak pazarlanabilir.
- **Müzeler ve Akvaryumlar:** Ziyaretçiler için dijital bir rehber olarak kullanılma potansiyeli yüksektir.
- **Teknolojik Gelişim:** Gelecekte WebXR standartlarının yaygınlaşması ile uygulama daha gelişmiş uzamsal (spatial) özellikler kazanabilir.

## Threats (Tehditler)
- **Tarayıcı Kısıtlamaları:** Apple (Safari) veya Google'ın (Chrome) kamera izni ve WebGL/WebXR politikalarındaki ani değişiklikler uygulamanın çalışmasını etkileyebilir.
- **Rakip Teknolojiler:** Native AR uygulamalarının (ARKit, ARCore) web tabanlı çözümlere göre daha stabil tracking sunması.
