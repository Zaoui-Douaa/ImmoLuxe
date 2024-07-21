package com.example.immoluxe.Entity;

import jakarta.persistence.Embeddable;

@Embeddable  // Indique que cette classe peut être utilisée comme une classe imbriquée

public  class Adresse
{
    String numero;
    String rue;
    String ville;
    String codePostal;
    String pays;
}
