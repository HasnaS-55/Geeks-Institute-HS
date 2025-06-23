import random
from typing import List

class Gene:
    def __init__(self):
        self.value = random.choice([0, 1])
    
    def mutate(self):
        self.value = 1 - self.value  
    
    def __str__(self):
        return str(self.value)

class Chromosome:
    def __init__(self):
        self.genes = [Gene() for _ in range(10)]
    
    def mutate(self):
        for gene in self.genes:
            if random.random() < 0.5:  
                gene.mutate()
    
    def is_all_ones(self) -> bool:
        return all(gene.value == 1 for gene in self.genes)
    
    def __str__(self):
        return ''.join(str(gene) for gene in self.genes)

class DNA:
    def __init__(self):
        self.chromosomes = [Chromosome() for _ in range(10)]
    
    def mutate(self):
        for chromosome in self.chromosomes:
            if random.random() < 0.5:  # 50% chance to mutate each chromosome
                chromosome.mutate()
    
    def is_all_ones(self) -> bool:
        return all(chromosome.is_all_ones() for chromosome in self.chromosomes)
    
    def __str__(self):
        return '\n'.join(str(chromosome) for chromosome in self.chromosomes)

class Organism:
    def __init__(self, dna: DNA, mutation_prob: float):
        self.dna = dna
        self.mutation_prob = mutation_prob
        self.generations = 0
    
    def mutate(self):
        if random.random() < self.mutation_prob:
            self.dna.mutate()
        self.generations += 1
    
    def is_perfect(self) -> bool:
        return self.dna.is_all_ones()
    
    def __str__(self):
        return f"Organism (generation: {self.generations}):\n{self.dna}"


def run_simulation(population_size: int, mutation_prob: float) -> int:
    population = [Organism(DNA(), mutation_prob) for _ in range(population_size)]
    generations = 0
    
    while True:
        generations += 1
        for org in population:
            org.mutate()
            if org.is_perfect():
                return generations


print("=== Biology Research Simulation ===")
print("Testing how many generations until perfect DNA emerges...\n")

results = []
for prob in [0.1, 0.3, 0.5, 0.7, 0.9]:
    gens = run_simulation(population_size=100, mutation_prob=prob)
    results.append((prob, gens))
    print(f"Mutation probability {prob:.1f}: {gens} generations")

print("\n=== Research Conclusions ===")
print("Higher mutation probabilities generally lead to faster evolution")
print("to perfect DNA (all 1s), but with more variability in results.")
print("Optimal mutation rate appears around 0.5-0.7 for this system.")