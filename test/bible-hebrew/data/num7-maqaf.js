var fromPassage = "Yehuda Num 7:12-17";
var toPassage = "Naftali Num 7:78-83";
var connectionType = "majority";
var fontSizeMin = 16;

var bibleEditions = [
	"Judah v12-17",
	"Issachar v18-23",
	"Zebulun v24-29",
	"Ruben v30-35",
	"Simeon v36-41",
	"Gad v42-47",
	"Ephraim v48-53",
	"Manasseh v54-59",
	"Benjamin v60-65",
	"Dan v66-71",
	"Asher v72-77",
	"Naftali v78-83"
];

var editionIds = [
	"Judah",
	"Issachar",
	"Zebulun",
	"Ruben",
	"Simeon",
	"Gad",
	"Ephraim",
	"Manasseh",
	"Benjamin",
	"Dan",
	"Asher",
	"Naftali"
];

var bibleVerses = [
["ויהי המקריב ביום הראשון את ־ קרבנו נחשון בן ־ עמינדב למטה יהודה׃", "ביום השני הקריב נתנאל בן ־ צוער נשיא יששכר׃", "ביום השלישי נשיא לבני זבולן אליאב בן ־ חלן׃", "ביום הרביעי נשיא לבני ראובן אליצור בן ־ שדיאור׃", "ביום החמישי נשיא לבני שמעון שלמיאל בן ־ צורישדי׃", "ביום הששי נשיא לבני גד אליסף בן ־ דעואל׃", "ביום השביעי נשיא לבני אפרים אלישמע בן ־ עמיהוד׃", "ביום השמיני נשיא לבני מנשה גמליאל בן ־ פדה ־ צור׃", "ביום התשיעי נשיא לבני בנימן אבידן בן ־ גדעני׃", "ביום העשירי נשיא לבני דן אחיעזר בן ־ עמישדי׃", "ביום עשתי עשר יום נשיא לבני אשר פגעיאל בן ־ עכרן׃", "ביום שנים עשר יום נשיא לבני נפתלי אחירע בן ־ עינן׃"], ["וקרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "הקרב את ־ קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃", "קרבנו קערת ־ כסף אחת שלשים ומאה משקלה מזרק אחד כסף שבעים שקל בשקל הקדש שניהם מלאים סלת בלולה בשמן למנחה׃"], ["כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃", "כף אחת עשרה זהב מלאה קטרת׃"], ["פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃", "פר אחד בן ־ בקר איל אחד כבש ־ אחד בן ־ שנתו לעלה׃"], ["שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃", "שעיר ־ עזים אחד לחטאת׃"], ["ולזבח השלמים בקר שנים אילם חמשה עתודים חמשה כבשים בני ־ שנה חמשה זה קרבן נחשון בן ־ עמינדב׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתודים חמשה כבשים בני ־ שנה חמשה זה קרבן נתנאל בן ־ צוער׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתדים חמשה כבשים בני ־ שנה חמשה זה קרבן אליאב בן ־ חלן׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתדים חמשה כבשים בני ־ שנה חמשה זה קרבן אליצור בן ־ שדיאור׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתדים חמשה כבשים בני ־ שנה חמשה זה קרבן שלמיאל בן ־ צורישדי׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתדים חמשה כבשים בני ־ שנה חמשה זה קרבן אליסף בן ־ דעואל׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתדים חמשה כבשים בני ־ שנה חמשה זה קרבן אלישמע בן ־ עמיהוד׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתדים חמשה כבשים בני ־ שנה חמשה זה קרבן גמליאל בן ־ פדהצור׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתדים חמשה כבשים בני ־ שנה חמשה זה קרבן אבידן בן ־ גדעני׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתדים חמשה כבשים בני ־ שנה חמשה זה קרבן אחיעזר בן ־ עמישדי׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתדים חמשה כבשים בני ־ שנה חמשה זה קרבן פגעיאל בן ־ עכרן׃ פ", "ולזבח השלמים בקר שנים אילם חמשה עתדים חמשה כבשים בני ־ שנה חמשה זה קרבן אחירע בן ־ עינן׃ פ"]
];
