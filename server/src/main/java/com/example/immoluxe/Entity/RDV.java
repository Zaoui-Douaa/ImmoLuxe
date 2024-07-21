package com.example.immoluxe.Entity;

import com.example.immoluxe.Common.BaseEntity;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RDV extends BaseEntity {
    String description;
    String NomRDVOwner ;
}
