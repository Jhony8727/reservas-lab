# Pedir para o usuário digitar cinco números
numeros = []
for i in range(5):
    numero = int(input(f"Digite o {i+1}º número: "))
    numeros.append(numero)

# Encontrar o maior número
maior_numero = max(numeros)

# Exibir o maior número
print(f"O maior número digitado é: {maior_numero}")