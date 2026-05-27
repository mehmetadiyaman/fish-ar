# Proje Gereksinim Analizi

## 1. Proje Özeti
YM-AR, mobil cihazların web tarayıcıları üzerinden çalışan, deniz canlılarını 3D olarak inceleme imkanı sunan eğitsel bir Karma Gerçeklik (MR) uygulamasıdır.

## 2. Fonksiyonel Gereksinimler
- **FG-01:** Sistem, kullanıcıdan kamera erişim izni isteyebilmelidir.
- **FG-02:** Sistem, ana ekranda incelenebilecek deniz canlılarının bir listesini sunmalıdır.
- **FG-03:** Sistem, kullanıcının kamerayı spesifik bir hedefe (marker) tutmasıyla ilgili 3D modeli (GLB formatında) ekranda render etmelidir.
- **FG-04:** Kullanıcı, ekrandaki 3D modeli parmak hareketleriyle (dokunma) döndürebilmeli, pinch hareketiyle ölçeklendirebilmeli ve sürükleyerek taşıyabilmelidir.
- **FG-05:** Hedef görsel tanındığında, sistem ekranda ilgili canlının özelliklerini (habitat, boyut, ağırlık vb.) içeren bir bilgi paneli göstermelidir.
- **FG-06:** Kullanıcı bilgi panelini daraltabilmeli ve genişletebilmelidir.
- **FG-07:** Sistem, 3D model yüklenirken kullanıcıya bir yükleme ekranı (loading) göstermelidir.

## 3. Non-Fonksiyonel (Fonksiyonel Olmayan) Gereksinimler
- **NFG-01 (Erişilebilirlik):** Uygulama herhangi bir mobil uygulama mağazası kurulumu gerektirmeden direkt web tarayıcısı (Safari, Chrome) üzerinden çalışmalıdır.
- **NFG-02 (Performans):** AR deneyimi mobil cihazlarda minimum 25 FPS (kare/saniye) hızında çalışmalıdır.
- **NFG-03 (Performans):** 3D modeller, mobil veri kullanımını minimize edecek şekilde optimize edilmiş boyutlarda (ideal olarak < 10MB) olmalıdır.
- **NFG-04 (Güvenlik):** Uygulama sadece HTTPS üzerinden hizmet vermeli ve kamera verisi sunucuya aktarılmamalıdır (işlem cihaz üzerinde yapılmalıdır).
- **NFG-05 (Kullanılabilirlik):** Arayüz tasarımı modern, anlaşılır ve tek el kullanımına uygun olmalıdır.
