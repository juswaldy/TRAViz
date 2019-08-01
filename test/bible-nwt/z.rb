#!/usr/local/rbenv/shims/ruby

class TWUClover
	def makeTraviz(filelist) # Join file list based on position. Files must have the same number of lines.
		# E.g. z.rb makeTraviz nwt1.txt,nwt2.txt,esv.txt
		files = filelist.split(',')
		filecontents = {}
		files.each do |f|
			filecontents[f] = File.readlines(f)
		end
		verses = []
		filecontents.values[0].each_index do |i|
			versions = []
			files.each do |f|
				versions.push "\"#{filecontents[f][i].chomp}\""
			end
			verses.push("[\n\t#{versions.join(",\n\t")}\n]")
		end
		puts verses.join(',')
	end
end

if ARGV.empty?
	puts "Usage: z.rb <app> [params]"
	puts "       z.rb list"
else
	tc = TWUClover.new
	tc.send(ARGV[0], *ARGV[1..-1])
end
