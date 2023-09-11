const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
const filtre2014 = fifaData.filter((yil) => {
  if (yil.Year === 2014 && yil.Stage === "Final") {
    return yil;
  }
});
console.log(filtre2014);

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const filtered2014 = filtre2014[0];

const fHomeTeam = filtered2014["Home Team Name"];
console.log(fHomeTeam);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

const fAwayTeam = filtered2014["Away Team Name"];
console.log(fAwayTeam);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const fHomeGoals = filtered2014["Home Team Goals"];
console.log(fHomeGoals);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const fAwayGoals = filtered2014["Away Team Goals"];
console.log(fAwayGoals);

//(e) 2014 Dünya kupası finali kazananı*/
if (fHomeGoals > fAwayGoals) {
  console.log(fHomeTeam);
} else {
  console.log(fAwayTeam);
}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(dizi) {
  const finalMaclari = dizi.filter(function (mac) {
    if (mac.Stage === "Final") {
      return mac;
    }
  });
  return finalMaclari;
}

console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(data, cbFinaller) {
  const finalMaclariDizisi = cbFinaller(data);

  const years = finalMaclariDizisi.map((mac) => mac.Year);
  return years;
}
console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(data, cbFinaller) {
  const finalMaclariDizisi = cbFinaller(data);

  const kazananlar = finalMaclariDizisi.map((mac) => {
    if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
      return mac["Home Team Name"];
    } else {
      return mac["Away Team Name"];
    }
  });
  return kazananlar;
}
console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(data, cbFinaller, cbYillar, cbKazananlar) {
  const finalMaclariDizisi = cbFinaller(data);

  const yillar = cbYillar(finalMaclariDizisi, cbFinaller);

  const kazananlar = cbKazananlar(finalMaclariDizisi, cbFinaller);

  const yillaraGoreKazananlar = yillar.map((yil, index) => {
    return `${yil} yılında, ${kazananlar[index]} dünya kupasını kazandı!`;
  });

  return yillaraGoreKazananlar;
}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(birFonksiyon) {
  const finalMaclariDizisi = birFonksiyon;
  const toplamGolSayisi = finalMaclariDizisi.reduce((acc, mac) => {
    return acc + mac["Home Team Goals"] + mac["Away Team Goals"];
  }, 0);
  const ortalamaGolSayisi = toplamGolSayisi / finalMaclariDizisi.length;

  return ortalamaGolSayisi.toFixed(2);
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data, takimKisaltmasi) {
  let winnerTeamInitial = [];
  for (let match of data) {
    if (match["Home Team Goals"] > match["Away Team Goals"]) {
      winnerTeamInitial.push(match["Home Team Initials"]);
    } else {
      winnerTeamInitial.push(match["Away Team Initials"]);
    }
  }
  let winnerTeams = winnerTeamInitial.reduce((acc, current) => {
    if (acc[current] === undefined) {
      acc[current] = 1;
    } else {
      acc[current]++;
    }
    return acc;
  }, {});
  return winnerTeams[takimKisaltmasi];
}
console.log(UlkelerinKazanmaSayilari(fifaData, "ITA"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
  const finalMaclari = data.filter((mac) => mac.Stage === "Final");

  const golSayilari = finalMaclari.reduce((accum, mac) => {
    const home = mac["Home Team Initials"];
    const away = mac["Away Team Initials"];
    const homeGoals = mac["Home Team Goals"];
    const awayGoals = mac["Away Team Goals"];
    accum[home] = (accum[home] || 0) + homeGoals;
    accum[away] = (accum[away] || 0) + awayGoals;
    return accum;
  }, {});

  console.log("Gol Sayilari", golSayilari);

  const sirali = Object.keys(golSayilari).sort(
    (a, b) => golSayilari[b] - golSayilari[a]
  );
  return sirali[0];
}
console.log("Bonus 2:", EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
  const finalMaclari = data.filter((mac) => mac.Stage === "Final");
  const golSayilari = finalMaclari.reduce((accum, mac) => {
    accum[mac["Away Team Initials"]] =
      (accum[mac["Away Team Initials"]] || 0) + mac["Home Team Goals"];
    accum[mac["Home Team Initials"]] =
      (accum[mac["Home Team Initials"]] || 0) + mac["Away Team Goals"];
    return accum;
  }, {});

  const sirali = Object.keys(golSayilari).sort(
    (a, b) => golSayilari[b] - golSayilari[a]
  );

  return sirali[0];
}
console.log("BONUS 3", EnKotuDefans(fifaData));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
