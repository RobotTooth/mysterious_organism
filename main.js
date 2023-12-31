// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      let mutationIndex;
      do {
        mutationIndex = Math.floor(Math.random() * 15);
      } while (
        this.dna[mutationIndex] === (this.dna[mutationIndex] = returnRandBase())
      );
      return this.dna;
    },
    compareDNA(specimen) {
      let count = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === specimen.dna[i]) {
          count++;
        }
      }
      return `specimen${this.specimenNum} and specimen${specimen.specimenNum} have ${((count/this.dna.length)*100).toFixed(2)}% DNA in common`;
    },
    willLikelySurvive() {
      let count = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === 'C' || this.dna === 'G') {
          count++;
        }
      }
      let survivalChance = (count/this.dna.length)*100;
      return survivalChance >= 60 ? true : false;
    },
    complimentaryStrand() {
      let compliment = [];
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === 'A') {
          compliment.push('T');
        } else if(this.dna[i] === 'T') {
          compliment.push('A');
        } else if(this.dna[i] === 'C') {
          compliment.push('G');
        } else compliment.push('C');
      }
      return compliment;
    },
  };
};

const mutantGenerator = () => {
  let survivors = [];
  let generatedSpecimenNumbers = new Set();

  while (survivors.length < 31) {
    let randomSpecimen;
    do {
      randomSpecimen = Math.floor(Math.random() * 1000);
    } while (generatedSpecimenNumbers.has(randomSpecimen));

    let mutant = pAequorFactory(randomSpecimen, mockUpStrand());
    if (mutant.willLikelySurvive()) {
      survivors.push(mutant);
      generatedSpecimenNumbers.add(randomSpecimen);
    }
  }
  
  return survivors;
};

// Supplied using chatGPT (findMostRelatedInstances)
function findMostRelatedInstances(pAequorInstances) {
  let mostRelatedPair = {
    instance1: null,
    instance2: null,
    similarity: 0
  };

  for (let i = 0; i < pAequorInstances.length - 1; i++) {
    for (let j = i + 1; j < pAequorInstances.length; j++) {
      const similarity = pAequorInstances[i].compareDNA(pAequorInstances[j]);
      if (similarity > mostRelatedPair.similarity) {
        mostRelatedPair.instance1 = pAequorInstances[i];
        mostRelatedPair.instance2 = pAequorInstances[j];
        mostRelatedPair.similarity = similarity;
      }
    }
  }

  return mostRelatedPair;
}

const mostRelatedPair = findMostRelatedInstances(pAequorInstances);
console.log(`The most related instances are specimen${mostRelatedPair.instance1.specimenNum} and specimen${mostRelatedPair.instance2.specimenNum} with ${mostRelatedPair.similarity.toFixed(2)}% DNA similarity.`);



const mutant1 = pAequorFactory(1, mockUpStrand());
const mutant2 = pAequorFactory(2, mockUpStrand());
console.log(mutant1.dna);
console.log(mutant2.dna);
console.log(mutant1.compareDNA(mutant2));
console.log(mutant1.willLikelySurvive());
console.log(mutantGenerator());




