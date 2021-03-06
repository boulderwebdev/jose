/**
 * Dependencies
 */
const Base64URLSchema = require('./Base64URLSchema')
const JWTClaimsSetSchema = require('./JWTClaimsSetSchema')
const JOSEHeaderSchema = require('./JOSEHeaderSchema')
const {JSONSchema} = require('@trust/json-document')

/**
 * JWTSchema
 *
 * @description
 * This schema represents all the things a deserialized JWT can be, i.e.,
 * either a JWS or JWE, and any serialization of them. Validation of well-
 * formedness for a given serialization is accomplished at the time of
 * encoding.
 */
const JWTSchema = new JSONSchema({
  type: 'object',
  properties: {

    /**
     * type
     */
    type: {
      type: 'string',
      enum: ['JWS', 'JWE']
    },

    /**
     * segments
     */
    segments: {
      type: 'array'
    },

    /**
     * header
     */
    header: JOSEHeaderSchema,

    /**
     * protected
     */
    protected: JOSEHeaderSchema,

    /**
     * unprotected
     */
    unprotected: JOSEHeaderSchema,

    /**
     * iv
     */
    iv: Base64URLSchema,

    /**
     * aad
     */
    aad: Base64URLSchema,

    /**
     * ciphertext
     */
    ciphertext: Base64URLSchema,

    /**
     * tag
     */
    tag: Base64URLSchema,

    /**
     * recipients
     */
    recipients: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          header: JOSEHeaderSchema,
          encrypted_key: Base64URLSchema
        }
      }
    },

    /**
     * payload
     */
    payload: JWTClaimsSetSchema,

    /**
     * signatures
     */
    signatures: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          protected: JOSEHeaderSchema,
          header: JOSEHeaderSchema,
          signature: Base64URLSchema,
          key: { type: 'object' }
        }
      }
    },

    /**
     * signature
     */
    signature: Base64URLSchema,

    /**
     * verified
     */
    verified: {
      type: 'boolean',
      default: false
    },

    /**
     * key
     */
    key: {
      type: 'object'
    },

    /**
     * serialization
     */
    serialization: {
      type: 'string',
      enum: ['compact', 'json', 'flattened'],
      default: 'compact'
    }
  }
})

/**
 * Export
 */
module.exports = JWTSchema
