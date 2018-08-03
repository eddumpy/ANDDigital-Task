const newCandidates = [
  { name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
  { name: "Mario", skills: ["Python", "AWS"] },
  { name: "Jacquline", skills: ["JavaScript", "Azure"] },
  { name: "Kathy", skills: ["JavaScript", "Java"] },
  { name: "Anna", skills: ["JavaScript", "AWS"] },
  { name: "Matt", skills: ["PHP", "AWS"] },
  { name: "Matt", skills: ["PHP", ".Net", "Docker"] },
];

function getSkills(candidates){
  // Gets all skills in candidate table
  var skills = new Set();
  for(var x in candidates){
    for(var y in candidates[x].skills){
      var skill = candidates[x].skills[y];
      skills.add(skill);
    }
  }
  return skills;
}

function removeRowsFromTable(table) {
  const rows = table.getElementsByTagName("tr");

  while (rows.length > 1) {
    table.deleteRow(1);
  }
}

function insertCandidate(tbody, name, skills) {
  const newRow = tbody.insertRow();
  const nameCell = newRow.insertCell();
  const skillCell = newRow.insertCell();

  const candidateName = document.createTextNode(name);
  const candidateSkills = document.createTextNode(skills.join(', '));

  nameCell.appendChild(candidateName);
  skillCell.appendChild(candidateSkills);
}

function addCandidatesToTable(table, candidates) {
  candidates.forEach(candidate => insertCandidate(table, candidate.name, candidate.skills));
}

function filterCandidateBySkill(candidates, skill) {
  // Copy Json object so it is not permanenetly edited
  var updatedCandidates = JSON.parse(JSON.stringify(candidates))

  for(var x in updatedCandidates){
    if(updatedCandidates[x].skills.indexOf(skill) == -1){
      // Remove row, to update the table
      delete updatedCandidates[x];
    }
  }
  return updatedCandidates;
}

function getCandidateTable(skill){
  const candidatesTable = document.getElementById("candidates_example");
  const newCandidatesTable = candidatesTable.cloneNode(true);

  removeRowsFromTable(newCandidatesTable);
  const newTbody = newCandidatesTable.getElementsByTagName('tbody')[0];

  const filteredCandidates = filterCandidateBySkill(newCandidates, skill);
  addCandidatesToTable(newTbody, filteredCandidates);

  return newCandidatesTable;
}
