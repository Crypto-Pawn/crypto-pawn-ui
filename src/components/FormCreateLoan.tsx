import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ethers } from 'ethers';
import { abi as mortgageTokenAbi, address as mortgageTokenAddress } from '@/libs/contracts/abis/MortgageToken.json';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/Form.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { Input } from './ui/Input.tsx';
import { useAccount } from 'wagmi';
import { useToast } from './ui/Toast/ToastProvider.tsx';

const formSchema = z.object({
  nftContract: z.string()
    .min(1, 'NFT Contract address is required')
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address format'),
  nftTokenId: z.string().min(1, 'NFT Token ID is required'),
  principal: z.number().positive('Principal must be greater than 0'),
  interest: z.number()
    .min(1, 'Interest must be greater than 0')
    .max(100, 'Interest must not exceed 100%'),
  duration: z.number().int().min(1, 'Duration must be at least 1 day').max(365, 'Duration must not exceed 365 days'),
});

type FormCreateLoanInputs = z.infer<typeof formSchema>;

const FormCreateLoan: React.FunctionComponent<{ closeDialog: () => void }> = ({ closeDialog }) => {
  const { address } = useAccount();
  const toast = useToast();
  const form = useForm<FormCreateLoanInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nftContract: '',
      nftTokenId: '',
      principal: 0,
      interest: 0,
      duration: 0,
    },
  });

  const onSubmit: SubmitHandler<FormCreateLoanInputs> = async data => {
    console.log('Form data submitted:', data);
    try {
      if (!window.ethereum) {
        throw new Error('Ethereum provider is not available');
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      if (!address) {
        throw new Error('User address is not available');
      }

      const contract = new ethers.Contract(mortgageTokenAddress, mortgageTokenAbi, signer);
      // await contract.setApprovalForAll(address, true);

      const tx = await contract.createLoan(
        data.nftTokenId,
        data.nftContract,
        data.principal,
        data.interest,
        data.duration
      );

      await tx.wait();

      console.log('Loan created successfully:', tx);
      toast.push('Create Loan successfully', 'success');
      closeDialog();
    } catch (error) {
      console.error('Error creating loan:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* NFT Contract Address Field */}
        <FormField
          control={form.control}
          name="nftContract"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>NFT Contract Address</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NFT Token ID Field */}
        <FormField
          control={form.control}
          name="nftTokenId"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>NFT Token ID</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Principal Field */}
        <FormField
          control={form.control}
          name="principal"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Principal (CPN)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Interest Field */}
        <FormField
          control={form.control}
          name="interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Interest (%)</FormLabel>
              <FormControl>
                <Input type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration Field */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Duration (in days)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="destructive" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit" variant="purple">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormCreateLoan;