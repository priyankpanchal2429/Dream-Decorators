'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsHeader } from '../components/SettingsHeader';
import { SettingsTabs } from '../components/SettingsTabs';
import { CompanyProfileTab } from '../components/CompanyProfileTab';
import { BankAccountsTab } from '../components/BankAccountsTab';
import { TermsConditionsTab } from '../components/TermsConditionsTab';
import {
  initialCompanyProfile,
  initialBankAccountDetails,
  initialTerms,
} from '../constants';
import {
  CompanyProfile,
  BankAccountDetails,
  TermsAndConditions,
  SettingsTabType,
} from '../types';

import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabType>('profile');

  // Business Profile State
  const [profile, setProfile] = useState<CompanyProfile>(initialCompanyProfile);

  // Bank & UPI State
  const [bank, setBank] = useState<BankAccountDetails>(initialBankAccountDetails);

  // Terms State
  const [terms, setTerms] = useState<TermsAndConditions>(initialTerms);

  // Save Feedback State
  const [isSaved, setIsSaved] = useState(false);

  const handleProfileChange = (field: keyof CompanyProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleBankChange = (field: keyof BankAccountDetails, value: string | null) => {
    setBank((prev) => ({ ...prev, [field]: value }));
  };

  const handleTermsChange = (value: string) => {
    setTerms({ terms: value });
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
      >
        <SettingsHeader isSaved={isSaved} onSave={handleSave} />
      </motion.div>

      {/* Staggered Container */}
      <motion.div
        className="space-y-6"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Tabs Selector */}
        <motion.div variants={springItemVariants}>
          <SettingsTabs activeTab={activeTab} onSelectTab={setActiveTab} />
        </motion.div>

        {/* Tab Panes with Smooth Fade */}
        <motion.div variants={springItemVariants}>
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <CompanyProfileTab
                  profile={profile}
                  onChange={handleProfileChange}
                />
              </motion.div>
            )}

            {activeTab === 'bank' && (
              <motion.div
                key="bank"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <BankAccountsTab
                  bank={bank}
                  onChange={handleBankChange}
                />
              </motion.div>
            )}

            {activeTab === 'terms' && (
              <motion.div
                key="terms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <TermsConditionsTab
                  terms={terms}
                  onChange={handleTermsChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
