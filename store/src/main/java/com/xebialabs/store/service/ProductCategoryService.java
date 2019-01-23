package com.xebialabs.store.service;

import com.xebialabs.store.domain.ProductCategory;
import com.xebialabs.store.repository.ProductCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing ProductCategory.
 */
@Service
@Transactional
public class ProductCategoryService {

    private final Logger log = LoggerFactory.getLogger(ProductCategoryService.class);

    private final ProductCategoryRepository productCategoryRepository;

    public ProductCategoryService(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    /**
     * Save a productCategory.
     *
     * @param productCategory the entity to save
     * @return the persisted entity
     */
    public ProductCategory save(ProductCategory productCategory) {
        log.debug("Request to save ProductCategory : {}", productCategory);
        return productCategoryRepository.save(productCategory);
    }

    /**
     * Get all the productCategories.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ProductCategory> findAll() {
        log.debug("Request to get all ProductCategories");
        return productCategoryRepository.findAll();
    }


    /**
     * Get one productCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ProductCategory> findOne(Long id) {
        log.debug("Request to get ProductCategory : {}", id);
        return productCategoryRepository.findById(id);
    }

    /**
     * Delete the productCategory by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductCategory : {}", id);
        productCategoryRepository.deleteById(id);
    }
}
