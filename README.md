# Wordy

I have taken a list of 20.000 english most used words from this repo --> https://github.com/first20hours/google-10000-english/edit/master/20k.txt and copy it into `20kWords.js` file

I have processed them to remove 2 char length words that made no sense --> `processed.json`
Then I have processed the list again (`processed.json`) to separate plural words from the rest --> `source20kwords.json`

This is from now on the valid source list to get word definitions, pronunciations, etc

I have removed intermediate files and processors to leave only final needed source data (`20kWords.js` file)