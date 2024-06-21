package com.olos.contracthelperapi.controllers;

import com.olos.contracthelperapi.entities.Contract;
import com.olos.contracthelperapi.services.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    private final ContractService contractService;

    @Autowired
    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping
    public List<Contract> getAllContracts() {
        return contractService.getAllContracts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable Long id) {
        Optional<Contract> contract = contractService.getContractById(id);
        return contract.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Contract createContract(@RequestBody Contract contract) {
        return contractService.createContract(contract);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contract> updateContract(@PathVariable Long id, @RequestBody Contract contract) {
        Contract updatedContract = contractService.updateContract(id, contract);
        if (updatedContract != null) {
            return ResponseEntity.ok(updatedContract);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContract(@PathVariable Long id) {
        contractService.deleteContract(id);
        return ResponseEntity.noContent().build();
    }
}
