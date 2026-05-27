# YM-AR: Deniz Canlıları WebAR Deneyimi

Bu proje, "Yazılım Mühendisliğinde Güncel Konular" dersi kapsamında geliştirilmiş bir Karma Gerçeklik (Mixed Reality - MR) uygulamasıdır. Proje, kullanıcıların mobil tarayıcıları üzerinden marker (görsel) tabanlı artırılmış gerçeklik deneyimi yaşayarak çeşitli deniz canlılarını 3D olarak inceleyebilmelerini sağlar.

## Teknolojik Altyapı
- **Frontend Framework:** React + Vite
- **AR Motoru:** MindAR (Image Tracking)
- **3D Render Motoru:** Three.js
- **Stil ve Arayüz:** Tailwind CSS v4
- **Platform:** Web tabanlı (iOS Safari, Chrome, Android uyumlu)

## Projenin Temel Özellikleri
- **Marker Tabanlı Takip:** Belirlenmiş deniz canlısı görselleri kamera ile okutulduğunda 3D modeller ekranda belirir.
- **Etkileşimli 3D Modeller:** Kullanıcılar modelleri dokunmatik hareketlerle döndürebilir, büyütebilir ve taşıyabilir.
- **Eğitici Bilgi Paneli:** Ekrana gelen 3D modelin boyut, ağırlık, derinlik ve habitat gibi bilgileri AR ekranında gösterilir.
- **Çoklu Model Desteği:** Sistem 9 farklı deniz canlısı (Somon, Ton Balığı, Kılıç Balığı vb.) için dinamik olarak çalışacak şekilde tasarlanmıştır.
- **Yüksek Performans:** 3D modeller ve AR motoru, mobil cihazlarda akıcı çalışması için lazy-loading ile optimize edilmiştir.

## Kurulum ve Çalıştırma
```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Uygulamayı derlemek için
npm run build
```

## Klasör Yapısı
- `/src`: React bileşenleri, yapılandırma ve state yönetimi.
- `/public`: 3D modeller (`.glb`), MindAR hedefleri (`.mind`) ve referans görseller (`.jpg`).
- `/docs`: Proje yönetim dokümanları (SWOT, RAMS, Gereksinimler, Kullanıcı Senaryosu, THS Raporu).
