package com.olos.contracthelperapi.services;

import com.olos.contracthelperapi.entities.Contract;
import com.olos.contracthelperapi.repositories.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    private final ContractRepository contractRepository;

    @Autowired
    public ContractService(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    public Optional<Contract> getContractById(Long id) {
        return contractRepository.findById(id);
    }

    public Contract createContract(Contract contract) {
        return contractRepository.save(contract);
    }

    public Contract updateContract(Long id, Contract contract) {
        Optional<Contract> existingContract = contractRepository.findById(id);
        if (existingContract.isPresent()) {
            contract.setId(id);
            return contractRepository.save(contract);
        } else {
            return null; // Or throw an exception
        }
    }

    public void deleteContract(Long id) {
        contractRepository.deleteById(id);
    }
}
