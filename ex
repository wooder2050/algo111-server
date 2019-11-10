{"_id":{"$oid":"5dc28f413e66f7bdedb498d8"},"level":"1","stage":"1",
"description":"수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.  마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.",
"Limitations":["마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.",
"completion의 길이는 participant의 길이보다 1 작습니다.",
"참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.",
"참가자 중에는 동명이인이 있을 수 있습니다."],
"input_example1":"participant: [leo, kiki, eden], completion: [eden, kiki]",
"output_example1":"leo",
"input_example2":"participant:[marina, josipa, nikola, vinko, filipa], completion:[josipa, filipa, marina, nikola]",
"output_example2":"vinko",
"test_case1":{
  "input":"participant:[mislav, stanko, mislav, ana],completion: [stanko, ana, mislav]",
"output":"mislav"},
"title":"완주하지 못한 선수",
"initialValue":
"function solution(participant, completion) {  \\n  //Your code here..  \\n var answer=\"\"; \\n  return answer; }",
"parmasNumber":"2",
"tests":[
  {"code":"solution(['leo', 'kiki', 'eden'],['eden', 'kiki'])","solution":"leo"},
  {"code":"solution(['marina', 'josipa', 'nikola', 'vinko', 'filipa'],['josipa', 'filipa', 'marina', 'nikola'])","solution":"vinko"},
  {"code":"solution(['mislav','stanko','mislav','ana'],['stanko','ana','mislav'])","solution":"mislav"}],
"notice":"function(n) -> function(n,m) 매개변수가 두 개 입니다. "}
