var fromPassage = "Hebrews";
var toPassage = "Hebrews";
var connectionType = "all";
var fontSizeMin = 23;

var bibleEditions = [
	"Hebrews",
	"LXX"	
];

var editionIds = [
	"Hebrews",
	"LXX"
];

var bibleVerses = [
[
"Heb1_5a υἱός μου εἶ σύ ἐγὼ σήμερον γεγέννηκά σε",
"Ps2_7 υἱός μου εἶ σύ ἐγὼ σήμερον γεγέννηκά σε"
],[
"Heb1_5b ἐγὼ ἔσομαι αὐτῷ εἰς πατέρα καὶ αὐτὸς ἔσται μοι εἰς υἱόν",
"2Sam7_14 ἐγὼ ἔσομαι αὐτῷ εἰς πατέρα καὶ αὐτὸς ἔσται μοι εἰς υἱόν"
],[
"Heb1_6 καὶ προσκυνησάτωσαν αὐτῷ πάντες ἄγγελοι θεοῦ",
"Deut32_43 καὶ προσκυνησάτωσαν αὐτῷ πάντες υἱοὶ θεοῦ"
],[
"Heb1_7 ὁ ποιῶν τοὺς ἀγγέλους αὐτοῦ πνεύματα καὶ τοὺς λειτουργοὺς αὐτοῦ πυρὸς φλόγα",
"Ps104 LXX103_4 ὁ ποιῶν τοὺς ἀγγέλους αὐτοῦ πνεύματα καὶ τοὺς λειτουργοὺς αὐτοῦ πῦρ φλέγον"
],[
"Heb1_8 ὁ θρόνος σου ὁ θεὸς εἰς τὸν αἰῶνα τοῦ αἰῶνος καὶ ἡ ῥάβδος τῆς εὐθύτητος ῥάβδος τῆς βασιλείας σου",
"Ps45_6 LXX44_7 ὁ θρόνος σου ὁ θεός εἰς τὸν αἰῶνα τοῦ αἰῶνος ῥάβδος εὐθύτητος ἡ ῥάβδος τῆς βασιλείας σου"
],[
"Heb1_9 ἠγάπησας δικαιοσύνην καὶ ἐμίσησας ἀνομίαν διὰ τοῦτο ἔχρισέν σε ὁ θεὸς ὁ θεός σου ἔλαιον ἀγαλλιάσεως παρὰ τοὺς μετόχους σου",
"Ps45_7 LXX44_8 ἠγάπησας δικαιοσύνην καὶ ἐμίσησας ἀνομίαν διὰ τοῦτο ἔχρισέν σε ὁ θεὸς ὁ θεός σου ἔλαιον ἀγαλλιάσεως παρὰ τοὺς μετόχους σου"
],[
"Heb1_10 σὺ κατ’ ἀρχάς κύριε τὴν γῆν ἐθεμελίωσας καὶ ἔργα τῶν χειρῶν σού εἰσιν οἱ οὐρανοί",
"Ps102_25 LXX101_26 κατ᾽ ἀρχὰς σύ κύριε τὴν γῆν ἐθεμελίωσας καὶ ἔργα τῶν χειρῶν σού εἰσιν οἱ οὐρανοί"
],[
"Heb1_11 αὐτοὶ ἀπολοῦνται σὺ δὲ διαμένεις καὶ πάντες ὡς ἱμάτιον παλαιωθήσονται",
"Ps102_26a LXX101_27a αὐτοὶ ἀπολοῦνται σὺ δὲ διαμενεῖς καὶ πάντες ὡς ἱμάτιον παλαιωθήσονται"
],[
"Heb1_12 καὶ ὡσεὶ περιβόλαιον ἑλίξεις αὐτούς ὡς ἱμάτιον καὶ ἀλλαγήσονται σὺ δὲ ὁ αὐτὸς εἶ καὶ τὰ ἔτη σου οὐκ ἐκλείψουσιν",
"Ps102_26b-27 LXX101_27b-28 καὶ ὡσεὶ περιβόλαιον ἀλλάξεις αὐτούς καὶ ἀλλαγήσονται σὺ δὲ ὁ αὐτὸς εἶ καὶ τὰ ἔτη σου οὐκ ἐκλείψουσιν"
],[
"Heb1_13 κάθου ἐκ δεξιῶν μου ἕως ἂν θῶ τοὺς ἐχθρούς σου ὑποπόδιον τῶν ποδῶν σου",
"Ps110_1 LXX109_1 Κάθου ἐκ δεξιῶν μου ἕως ἂν θῶ τοὺς ἐχθρούς σου ὑποπόδιον τῶν ποδῶν σου"
],[
"Heb2_6 τί ἐστιν ἄνθρωπος ὅτι μιμνῄσκῃ αὐτοῦ ἢ υἱὸς ἀνθρώπου ὅτι ἐπισκέπτῃ αὐτόν",
"Psalm8_4 LXX8_5 τί ἐστιν ἄνθρωπος ὅτι μιμνῄσκῃ αὐτοῦ ἢ υἱὸς ἀνθρώπου ὅτι ἐπισκέπτῃ αὐτόν"
],[
"Heb2_7 ἠλάττωσας αὐτὸν βραχύ τι παρ’ ἀγγέλους δόξῃ καὶ τιμῇ ἐστεφάνωσας αὐτόν",
"Psalm8_5 LXX8_6 ἠλάττωσας αὐτὸν βραχύ τι παρ’ ἀγγέλους δόξῃ καὶ τιμῇ ἐστεφάνωσας αὐτόν"
],[
"Heb2_8 πάντα ὑπέταξας ὑποκάτω τῶν ποδῶν αὐτοῦ",
"Psalm8_6 LXX8_7 καὶ κατέστησας αὐτὸν ἐπὶ τὰ ἔργα τῶν χειρῶν σου πάντα ὑπέταξας ὑποκάτω τῶν ποδῶν αὐτοῦ"
],[
"Heb2_12 ἀπαγγελῶ τὸ ὄνομά σου τοῖς ἀδελφοῖς μου ἐν μέσῳ ἐκκλησίας ὑμνήσω σε",
"Ps22_22 LXX21_23 διηγήσομαι τὸ ὄνομά σου τοῖς ἀδελφοῖς μου ἐν μέσῳ ἐκκλησίας ὑμνήσω σε"
],[
"Heb2_13a ἐγὼ ἔσομαι πεποιθὼς ἐπ’ αὐτῷ",
"Isa8_17b πεποιθὼς ἔσομαι ἐπ’ αὐτῷ"
],[
"Heb2_13b ἰδοὺ ἐγὼ καὶ τὰ παιδία ἅ μοι ἔδωκεν ὁ θεός",
"Isa8_18 ἰδοὺ ἐγὼ καὶ τὰ παιδία ἅ μοι ἔδωκεν ὁ θεός"
],[
"Heb3_7b σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε",
"Ps95_7b LXX94_7b σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε"
],[
"Heb3_8 μὴ σκληρύνητε τὰς καρδίας ὑμῶν ὡς ἐν τῷ παραπικρασμῷ κατὰ τὴν ἡμέραν τοῦ πειρασμοῦ ἐν τῇ ἐρήμῳ",
"Ps95_8 LXX94_8 μὴ σκληρύνητε τὰς καρδίας ὑμῶν ὡς ἐν τῷ παραπικρασμῷ κατὰ τὴν ἡμέραν τοῦ πειρασμοῦ ἐν τῇ ἐρήμῳ"
],[
"Heb3_9 οὗ ἐπείρασαν οἱ πατέρες ὑμῶν ἐν δοκιμασίᾳ καὶ εἶδον τὰ ἔργα μου",
"Ps95_9 LXX94_9 οὗ ἐπείρασαν οἱ πατέρες ὑμῶν ἐδοκίμασαν καὶ εἴδοσαν τὰ ἔργα μου"
],[
"Heb3_10 τεσσεράκοντα ἔτη διὸ προσώχθισα τῇ γενεᾷ ταύτῃ καὶ εἶπον ἀεὶ πλανῶνται τῇ καρδίᾳ αὐτοὶ δὲ οὐκ ἔγνωσαν τὰς ὁδούς μου",
"Ps95_10 LXX94_10 τεσσαράκοντα ἔτη προσώχθισα τῇ γενεᾷ ἐκείνῃ καὶ εἶπα ᾿Αεὶ πλανῶνται τῇ καρδίᾳ καὶ αὐτοὶ οὐκ ἔγνωσαν τὰς ὁδούς μου"
],[
"Heb3_11 ὡς ὤμοσα ἐν τῇ ὀργῇ μου εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου",
"Ps95_11 LXX94_11 ὡς ὤμοσα ἐν τῇ ὀργῇ μου εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου"
],[
"Heb3_15 σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε μὴ σκληρύνητε τὰς καρδίας ὑμῶν ὡς ἐν τῷ παραπικρασμῷ",
"Ps95_7b-8 LXX94_7b-8 σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε μὴ σκληρύνητε τὰς καρδίας ὑμῶν ὡς ἐν τῷ παραπικρασμῷ"
],[
"Heb4_3 ὡς ὤμοσα ἐν τῇ ὀργῇ μου εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου",
"Ps95_11 LXX94_11 ὡς ὤμοσα ἐν τῇ ὀργῇ μου εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου"
],[
"Heb4_4 καὶ κατέπαυσεν ὁ θεὸς ἐν τῇ ἡμέρᾳ τῇ ἑβδόμῃ ἀπὸ πάντων τῶν ἔργων αὐτοῦ",
"Gen2_2 καὶ κατέπαυσεν τῇ ἡμέρᾳ τῇ ἑβδόμῃ ἀπὸ πάντων τῶν ἔργων αὐτοῦ"
],[
"Heb4_5 εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου",
"Ps95_11b LXX94_11b εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου"
],[
"Heb4_7 σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε μὴ σκληρύνητε τὰς καρδίας ὑμῶν",
"Ps95_7b_8a LXX94_7b_8a σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε μὴ σκληρύνητε τὰς καρδίας ὑμῶν"
],[
"Heb5_5 υἱός μου εἶ σύ ἐγὼ σήμερον γεγέννηκά σε",
"Ps2_7 υἱός μου εἶ σύ ἐγὼ σήμερον γεγέννηκά σε"
],[
"Heb5_6 σὺ ἱερεὺς εἰς τὸν αἰῶνα κατὰ τὴν τάξιν Μελχισέδεκ",
"Ps110_4 LXX109_4 σὺ εἶ ἱερεὺς εἰς τὸν αἰῶνα κατὰ τὴν τάξιν Μελχισεδεκ"
],[
"Heb6_14 εἰ μὴν εὐλογῶν εὐλογήσω σε καὶ πληθύνων πληθυνῶ σε",
"Gen22_17 ἦ μὴν εὐλογῶν εὐλογήσω σε καὶ πληθύνων πληθυνῶ τὸ σπέρμα σου"
],[
"Heb7_17 σὺ ἱερεὺς εἰς τὸν αἰῶνα κατὰ τὴν τάξιν Μελχισέδεκ",
"Ps110_4 LXX109_4 σὺ εἶ ἱερεὺς εἰς τὸν αἰῶνα κατὰ τὴν τάξιν Μελχισεδεκ"
],[
"Heb7_21 ὤμοσεν κύριος καὶ οὐ μεταμεληθήσεται σὺ ἱερεὺς εἰς τὸν αἰῶνα",
"Ps110_4 LXX109_4 ὤμοσεν κύριος καὶ οὐ μεταμεληθήσεται σὺ εἶ ἱερεὺς εἰς τὸν αἰῶνα"
],[
"Heb8_5 ὅρα γάρ φησιν ποιήσεις πάντα κατὰ τὸν τύπον τὸν δειχθέντα σοι ἐν τῷ ὄρει",
"Exo25_40 ὅρα ποιήσεις κατὰ τὸν τύπον τὸν δεδειγμένον σοι ἐν τῷ ὄρει"
],[
"Heb8_8 ἰδοὺ ἡμέραι ἔρχονται λέγει κύριος καὶ συντελέσω ἐπὶ τὸν οἶκον Ἰσραὴλ καὶ ἐπὶ τὸν οἶκον Ἰούδα διαθήκην καινήν",
"Jer31_31 LXXJer 38_31 ἰδοὺ ἡμέραι ἔρχονται φησὶν κύριος καὶ διαθήσομαι τῷ οἴκῳ Ισραηλ καὶ τῷ οἴκῳ Ιουδα διαθήκην καινήν"
],[
"Heb8_9 οὐ κατὰ τὴν διαθήκην ἣν ἐποίησα τοῖς πατράσιν αὐτῶν ἐν ἡμέρᾳ ἐπιλαβομένου μου τῆς χειρὸς αὐτῶν ἐξαγαγεῖν αὐτοὺς ἐκ γῆς Αἰγύπτου ὅτι αὐτοὶ οὐκ ἐνέμειναν ἐν τῇ διαθήκῃ μου κἀγὼ ἠμέλησα αὐτῶν λέγει κύριος",
"Jer31_32 LXXJer 38_32 οὐ κατὰ τὴν διαθήκην ἣν διεθέμην τοῖς πατράσιν αὐτῶν ἐν ἡμέρᾳ ἐπιλαβομένου μου τῆς χειρὸς αὐτῶν ἐξαγαγεῖν αὐτοὺς ἐκ γῆς Αἰγύπτου ὅτι αὐτοὶ οὐκ ἐνέμειναν ἐν τῇ διαθήκῃ μου καὶ ἐγὼ ἠμέλησα αὐτῶν φησὶν κύριος"
],[
"Heb8_10 ὅτι αὕτη ἡ διαθήκη ἣν διαθήσομαι τῷ οἴκῳ Ἰσραὴλ μετὰ τὰς ἡμέρας ἐκείνας λέγει κύριος διδοὺς νόμους μου εἰς τὴν διάνοιαν αὐτῶν καὶ ἐπὶ καρδίας αὐτῶν ἐπιγράψω αὐτούς καὶ ἔσομαι αὐτοῖς εἰς θεόν καὶ αὐτοὶ ἔσονταί μοι εἰς λαόν",
"Jer31_33 LXXJer 38_33 ὅτι αὕτη ἡ διαθήκη ἣν διαθήσομαι τῷ οἴκῳ Ισραηλ μετὰ τὰς ἡμέρας ἐκείνας φησὶν κύριος διδοὺς δώσω νόμους μου εἰς τὴν διάνοιαν αὐτῶν καὶ ἐπὶ καρδίας αὐτῶν γράψω αὐτούς καὶ ἔσομαι αὐτοῖς εἰς θεόν καὶ αὐτοὶ ἔσονταί μοι εἰς λαόν"
],[
"Heb8_11 καὶ οὐ μὴ διδάξωσιν ἕκαστος τὸν πολίτην αὐτοῦ καὶ ἕκαστος τὸν ἀδελφὸν αὐτοῦ λέγων γνῶθι τὸν κύριον ὅτι πάντες εἰδήσουσίν με ἀπὸ μικροῦ ἕως μεγάλου αὐτῶν",
"Jer31_34a LXXJer 38_34a καὶ οὐ μὴ διδάξωσιν ἕκαστος τὸν πολίτην αὐτοῦ καὶ ἕκαστος τὸν ἀδελφὸν αὐτοῦ λέγων Γνῶθι τὸν κύριον ὅτι πάντες εἰδήσουσίν με ἀπὸ μικροῦ αὐτῶν καὶ ἕως μεγάλου αὐτῶν"
],[
"Heb8_12 ὅτι ἵλεως ἔσομαι ταῖς ἀδικίαις αὐτῶν καὶ τῶν ἁμαρτιῶν αὐτῶν οὐ μὴ μνησθῶ ἔτι",
"Jer31_34b LXXJer 38_34b ὅτι ἵλεως ἔσομαι ταῖς ἀδικίαις αὐτῶν καὶ τῶν ἁμαρτιῶν αὐτῶν οὐ μὴ μνησθῶ ἔτι"
],[
"Heb9_20 τοῦτο τὸ αἷμα τῆς διαθήκης ἧς ἐνετείλατο πρὸς ὑμᾶς ὁ θεός",
"Exo24_8 ἰδοὺ τὸ αἷμα τῆς διαθήκης ἧς διέθετο κύριος πρὸς ὑμᾶς"
],[
"Heb10_5 θυσίαν καὶ προσφορὰν οὐκ ἠθέλησας σῶμα δὲ κατηρτίσω μοι",
"Ps40_6a LXX39_7a θυσίαν καὶ προσφορὰν οὐκ ἠθέλησας ὠτία δὲ κατηρτίσω μοι"
],[
"Heb10_6 ὁλοκαυτώματα καὶ περὶ ἁμαρτίας οὐκ εὐδόκησας",
"Ps40_6b LXX39_7b ὁλοκαύτωμα καὶ περὶ ἁμαρτίας οὐκ ᾔτησας"
],[
"Heb10_7 τότε εἶπον ἰδοὺ ἥκω ἐν κεφαλίδι βιβλίου γέγραπται περὶ ἐμοῦ τοῦ ποιῆσαι ὁ θεὸς τὸ θέλημά σου",
"Ps40_7-8a LXX39_8-9a τότε εἶπον ἰδοὺ ἥκω ἐν κεφαλίδι βιβλίου γέγραπται περὶ ἐμοῦ τοῦ ποιῆσαι τὸ θέλημά σου"
],[
"Heb10_16 αὕτη ἡ διαθήκη ἣν διαθήσομαι πρὸς αὐτοὺς μετὰ τὰς ἡμέρας ἐκείνας λέγει κύριος διδοὺς νόμους μου ἐπὶ καρδίας αὐτῶν καὶ ἐπὶ τὴν διάνοιαν αὐτῶν ἐπιγράψω αὐτούς",
"Jer31_33 LXXJer 38_33 αὕτη ἡ διαθήκη ἣν διαθήσομαι τῷ οἴκῳ Ισραηλ μετὰ τὰς ἡμέρας ἐκείνας φησὶν κύριος διδοὺς δώσω νόμους μου εἰς τὴν διάνοιαν αὐτῶν καὶ ἐπὶ καρδίας αὐτῶν γράψω αὐτούς"
],[
"Heb10_17 τῶν ἁμαρτιῶν αὐτῶν καὶ τῶν ἀνομιῶν αὐτῶν οὐ μὴ μνησθήσομαι ἔτι",
"Jer31_34b LXXJer 38_34b ἵλεως ἔσομαι ταῖς ἀδικίαις αὐτῶν καὶ τῶν ἁμαρτιῶν αὐτῶν οὐ μὴ μνησθῶ ἔτι"
],[
"Heb10_37a ἔτι γὰρ μικρὸν ὅσον ὅσον",
"Isa26_20b μικρὸν ὅσον ὅσον"
],[
"Heb10_37b ὁ ἐρχόμενος ἥξει καὶ οὐ χρονίσει",
"Hab2_3 ὅτι ἐρχόμενος ἥξει καὶ οὐ μὴ χρονίσῃ"
],[
"Heb10_38a ὁ δὲ δίκαιός μου ἐκ πίστεως ζήσεται",
"Hab2_4b ὁ δὲ δίκαιος ἐκ πίστεώς μου ζήσεται"
],[
"Heb10_39b ἐὰν ὑποστείληται οὐκ εὐδοκεῖ ἡ ψυχή μου ἐν αὐτῷ",
"Hab2_4a ἐὰν ὑποστείληται οὐκ εὐδοκεῖ ἡ ψυχή μου ἐν αὐτῷ"
],[
"Heb11_18 ἐν Ἰσαὰκ κληθήσεταί σοι σπέρμα",
"Gen21_12b ἐν Ισαακ κληθήσεταί σοι σπέρμα"
],[
"Heb11_21b προσεκύνησεν ἐπὶ τὸ ἄκρον τῆς ῥάβδου αὐτοῦ",
"Gen47_31b προσεκύνησεν Ισραηλ ἐπὶ τὸ ἄκρον τῆς ῥάβδου αὐτοῦ"
],[
"Heb12_5 υἱέ μου μὴ ὀλιγώρει παιδείας κυρίου μηδὲ ἐκλύου ὑπ’ αὐτοῦ ἐλεγχόμενος",
"Prov3_11 υἱέ μὴ ὀλιγώρει παιδείας κυρίου μηδὲ ἐκλύου ὑπ’ αὐτοῦ ἐλεγχόμενος"
],[
"Heb12_6 ὃν γὰρ ἀγαπᾷ κύριος παιδεύει μαστιγοῖ δὲ πάντα υἱὸν ὃν παραδέχεται",
"Prov3_12 ὃν γὰρ ἀγαπᾷ κύριος παιδεύει μαστιγοῖ δὲ πάντα υἱὸν ὃν παραδέχεται"
],[
"Heb12_15 μή τις ῥίζα πικρίας ἄνω φύουσα ἐνοχλῇ",
"Deut29_18b LXX29_17b μή τίς ἐστιν ἐν ὑμῖν ῥίζα ἄνω φύουσα ἐν χολῇ"
],[
"Heb12_26 ἔτι ἅπαξ ἐγὼ σείσω οὐ μόνον τὴν γῆν ἀλλὰ καὶ τὸν οὐρανόν",
"Hag2_6 ἔτι ἅπαξ ἐγὼ σείσω τὸν οὐρανὸν καὶ τὴν γῆν"
],[
"Heb12_29 ὁ θεὸς ἡμῶν πῦρ καταναλίσκον",
"Deut4_24 ὁ θεός σου πῦρ καταναλίσκον ἐστίν"
],[
"Heb13_5 οὐ μή σε ἀνῶ οὐδ’ οὐ μή σε ἐγκαταλίπω",
"Deut31_6 οὐ μή σε ἀνῇ οὔτε μή σε ἐγκαταλίπῃ"
],[
"Heb13_6 κύριος ἐμοὶ βοηθός οὐ φοβηθήσομαι τί ποιήσει μοι ἄνθρωπος",
"Ps118_6 LXX118_6 κύριος ἐμοὶ βοηθός οὐ φοβηθήσομαι τί ποιήσει μοι ἄνθρωπος"
]
];